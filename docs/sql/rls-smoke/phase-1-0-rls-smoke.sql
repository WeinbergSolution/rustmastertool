-- A) Struktur-Checks
DO $$ 
BEGIN
    -- Check Table Existence
    ASSERT (SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename  = 'profiles'));
    ASSERT (SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename  = 'provider_servers'));
    ASSERT (SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename  = 'provider_source_status'));
    ASSERT (SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename  = 'user_watchlists'));
    ASSERT (SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename  = 'watchlist_items'));
    ASSERT (SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename  = 'alert_rules'));
    ASSERT (SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename  = 'alert_events'));
    ASSERT NOT (SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename  = 'provider_snapshots'));

    -- Check RLS enabled
    ASSERT (SELECT rowsecurity FROM pg_tables WHERE schemaname = 'public' AND tablename = 'profiles');
    ASSERT (SELECT rowsecurity FROM pg_tables WHERE schemaname = 'public' AND tablename = 'provider_servers');
    ASSERT (SELECT rowsecurity FROM pg_tables WHERE schemaname = 'public' AND tablename = 'provider_source_status');
    ASSERT (SELECT rowsecurity FROM pg_tables WHERE schemaname = 'public' AND tablename = 'user_watchlists');
    ASSERT (SELECT rowsecurity FROM pg_tables WHERE schemaname = 'public' AND tablename = 'watchlist_items');
    ASSERT (SELECT rowsecurity FROM pg_tables WHERE schemaname = 'public' AND tablename = 'alert_rules');
    ASSERT (SELECT rowsecurity FROM pg_tables WHERE schemaname = 'public' AND tablename = 'alert_events');
END $$;

-- RLS Test Matrix
BEGIN; -- Wrap all inserts in a transaction so we can rollback

-- 1. Setup Test Data as Postgres (admin)
DO $$
DECLARE
    user_a_id uuid := '00000000-0000-0000-0000-00000000000a';
    user_b_id uuid := '00000000-0000-0000-0000-00000000000b';
    provider_server_id_1 uuid := '11111111-1111-1111-1111-111111111111';
    provider_server_id_2 uuid := '22222222-2222-2222-2222-222222222222';
    watchlist_a_id uuid := 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
    watchlist_b_id uuid := 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
BEGIN
    -- Disable RLS triggers for this session if needed (we are postgres role so we bypass RLS anyway)
    
    -- insert users
    INSERT INTO auth.users (id, email) VALUES (user_a_id, 'userA@example.com'), (user_b_id, 'userB@example.com');

    -- Note: profiles might be auto-created by triggers, if not insert:
    -- (Assuming trigger creates profiles for now, if not we ignore or insert manually)
    INSERT INTO public.profiles (id, steam_id, display_name) VALUES (user_a_id, '123A', 'User A') ON CONFLICT DO NOTHING;
    INSERT INTO public.profiles (id, steam_id, display_name) VALUES (user_b_id, '123B', 'User B') ON CONFLICT DO NOTHING;

    -- insert provider servers
    INSERT INTO public.provider_servers (id, provider, provider_id, name, country, status) 
    VALUES 
    (provider_server_id_1, 'battlemetrics', 'bm_1', 'Server 1', 'US', 'online'),
    (provider_server_id_2, 'battlemetrics', 'bm_2', 'Server 2', 'US', 'online');

    -- insert provider source status
    INSERT INTO public.provider_source_status (provider, last_successful_sync_at, status) VALUES ('battlemetrics', now(), 'pending');

    -- insert user watchlists
    INSERT INTO public.user_watchlists (id, user_id, name, is_default) VALUES (watchlist_a_id, user_a_id, 'Watchlist A', true);
    INSERT INTO public.user_watchlists (id, user_id, name, is_default) VALUES (watchlist_b_id, user_b_id, 'Watchlist B', true);

    -- insert watchlist items
    INSERT INTO public.watchlist_items (watchlist_id, provider_server_id) VALUES (watchlist_a_id, provider_server_id_1);
    INSERT INTO public.watchlist_items (watchlist_id, provider_server_id) VALUES (watchlist_b_id, provider_server_id_2);

    -- insert alert rules
    INSERT INTO public.alert_rules (user_id, provider_server_id, metric, condition, threshold) 
    VALUES (user_a_id, provider_server_id_1, 'players', 'above', 100);

    -- insert alert events
    INSERT INTO public.alert_events (user_id, alert_rule_id, metric, triggered_value, dedup_key)
    VALUES (user_a_id, (SELECT id FROM public.alert_rules LIMIT 1), 'players', 105, 'dedup_a');
    
    INSERT INTO public.alert_events (user_id, alert_rule_id, metric, triggered_value, dedup_key)
    VALUES (user_b_id, (SELECT id FROM public.alert_rules LIMIT 1), 'players', 105, 'dedup_b');
END $$;


-- C) RLS Test Matrix
DO $$
DECLARE
    user_a_id uuid := '00000000-0000-0000-0000-00000000000a';
    user_b_id uuid := '00000000-0000-0000-0000-00000000000b';
    provider_server_id_1 uuid := '11111111-1111-1111-1111-111111111111';
    watchlist_b_id uuid := 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
    count_res int;
BEGIN

    -------------------------------------------------
    -- AUTHENTICATED USER A
    -------------------------------------------------
    PERFORM set_config('role', 'authenticated', true);
    PERFORM set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-00000000000a","role":"authenticated"}', true);

    -- 1. authenticated User A sieht nur eigene user_watchlists.
    SELECT count(*) INTO count_res FROM public.user_watchlists;
    IF count_res <> 1 THEN RAISE EXCEPTION 'RLS LEAK: Case 1 Failed'; END IF;

    -- 2. authenticated User A sieht keine User-B user_watchlists.
    SELECT count(*) INTO count_res FROM public.user_watchlists WHERE user_id = user_b_id;
    IF count_res <> 0 THEN RAISE EXCEPTION 'RLS LEAK: Case 2 Failed'; END IF;

    -- 3. authenticated User A kann eigenes watchlist_item insertieren.
    -- We can insert into watchlist_a_id (we need to select it first since we are user A)
    INSERT INTO public.watchlist_items (watchlist_id, provider_server_id) 
    SELECT id, provider_server_id_2 FROM public.user_watchlists WHERE user_id = user_a_id LIMIT 1;

    -- 4. authenticated User A kann kein watchlist_item in User-B Watchlist insertieren.
    BEGIN
        INSERT INTO public.watchlist_items (watchlist_id, provider_server_id) VALUES (watchlist_b_id, provider_server_id_1);
        RAISE EXCEPTION 'RLS LEAK: Case 4 Failed';
    EXCEPTION WHEN insufficient_privilege THEN
        -- Expected
    END;

    -- 5. authenticated User A sieht keine User-B watchlist_items.
    SELECT count(*) INTO count_res FROM public.watchlist_items WHERE watchlist_id = watchlist_b_id;
    IF count_res <> 0 THEN RAISE EXCEPTION 'RLS LEAK: Case 5 Failed'; END IF;

    -- 6. authenticated User A kann eigenes watchlist_item löschen.
    DELETE FROM public.watchlist_items WHERE provider_server_id = provider_server_id_2;

    -- 7. authenticated User A sieht nur eigene alert_events.
    SELECT count(*) INTO count_res FROM public.alert_events;
    IF count_res <> 1 THEN RAISE EXCEPTION 'RLS LEAK: Case 7 Failed'; END IF;

    -- 8. authenticated User A sieht keine User-B alert_events.
    SELECT count(*) INTO count_res FROM public.alert_events WHERE user_id = user_b_id;
    IF count_res <> 0 THEN RAISE EXCEPTION 'RLS LEAK: Case 8 Failed'; END IF;

    -- 9. authenticated User A kann kein alert_event clientseitig insertieren.
    BEGIN
        INSERT INTO public.alert_events (user_id, alert_rule_id, metric, triggered_value, dedup_key) 
        VALUES (user_a_id, (SELECT id FROM public.alert_rules LIMIT 1), 'players', 105, 'dedup_test');
        RAISE EXCEPTION 'RLS LEAK: Case 9 Failed';
    EXCEPTION WHEN insufficient_privilege THEN
        -- Expected
    END;

    -- 10. authenticated User A sieht nur eigenes profile.
    SELECT count(*) INTO count_res FROM public.profiles;
    IF count_res <> 1 THEN RAISE EXCEPTION 'RLS LEAK: Case 10 Failed'; END IF;

    -- 11. authenticated User A sieht kein User-B profile.
    SELECT count(*) INTO count_res FROM public.profiles WHERE id = user_b_id;
    IF count_res <> 0 THEN RAISE EXCEPTION 'RLS LEAK: Case 11 Failed'; END IF;

    -------------------------------------------------
    -- ANON USER
    -------------------------------------------------
    PERFORM set_config('role', 'anon', true);
    PERFORM set_config('request.jwt.claims', '{}', true);

    -- 12. anon kann provider_servers lesen.
    SELECT count(*) INTO count_res FROM public.provider_servers;
    IF count_res = 0 THEN RAISE EXCEPTION 'RLS LEAK: Case 12 Failed'; END IF;

    -- 13. anon/auth kann provider_servers nicht insert/update/delete.
    BEGIN
        INSERT INTO public.provider_servers (provider, provider_id, name, country, status) VALUES ('test', 't1', 't', 'US', 'online');
        RAISE EXCEPTION 'RLS LEAK: Case 13 Failed';
    EXCEPTION WHEN insufficient_privilege THEN
        -- Expected
    END;

    -- 14. anon kann provider_source_status lesen.
    SELECT count(*) INTO count_res FROM public.provider_source_status;
    IF count_res = 0 THEN RAISE EXCEPTION 'RLS LEAK: Case 14 Failed'; END IF;

    -- 15. anon/auth kann provider_source_status nicht insertieren.
    BEGIN
        INSERT INTO public.provider_source_status (provider, status) VALUES ('test2', 'pending');
        RAISE EXCEPTION 'RLS LEAK: Case 15 Failed';
    EXCEPTION WHEN insufficient_privilege THEN
        -- Expected
    END;

    -- 16. anon sieht keine user_watchlists.
    SELECT count(*) INTO count_res FROM public.user_watchlists;
    IF count_res <> 0 THEN RAISE EXCEPTION 'RLS LEAK: Case 16 Failed'; END IF;

END $$;

ROLLBACK;
