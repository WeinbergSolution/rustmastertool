-- Remote RLS Smoke Verification
-- Phase 1.1-B

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

    -- B) Check RLS enabled
    ASSERT (SELECT rowsecurity FROM pg_tables WHERE schemaname = 'public' AND tablename = 'profiles');
    ASSERT (SELECT rowsecurity FROM pg_tables WHERE schemaname = 'public' AND tablename = 'provider_servers');
    ASSERT (SELECT rowsecurity FROM pg_tables WHERE schemaname = 'public' AND tablename = 'provider_source_status');
    ASSERT (SELECT rowsecurity FROM pg_tables WHERE schemaname = 'public' AND tablename = 'user_watchlists');
    ASSERT (SELECT rowsecurity FROM pg_tables WHERE schemaname = 'public' AND tablename = 'watchlist_items');
    ASSERT (SELECT rowsecurity FROM pg_tables WHERE schemaname = 'public' AND tablename = 'alert_rules');
    ASSERT (SELECT rowsecurity FROM pg_tables WHERE schemaname = 'public' AND tablename = 'alert_events');

    -- C) Unique Constraint Checks
    -- provider_servers unique(provider_type, provider_id)
    ASSERT (SELECT EXISTS(
        SELECT 1 FROM pg_index i
        JOIN pg_class c ON c.oid = i.indrelid
        JOIN pg_attribute a ON a.attrelid = c.oid AND a.attnum = ANY(i.indkey)
        WHERE c.relname = 'provider_servers' AND i.indisunique = true
        GROUP BY i.indexrelid
        HAVING string_agg(a.attname, ',' ORDER BY a.attname) = 'provider_id,provider_type'
    ));

    -- user_watchlists unique(user_id, name)
    ASSERT (SELECT EXISTS(
        SELECT 1 FROM pg_index i
        JOIN pg_class c ON c.oid = i.indrelid
        JOIN pg_attribute a ON a.attrelid = c.oid AND a.attnum = ANY(i.indkey)
        WHERE c.relname = 'user_watchlists' AND i.indisunique = true
        GROUP BY i.indexrelid
        HAVING string_agg(a.attname, ',' ORDER BY a.attname) = 'name,user_id'
    ));

    -- watchlist_items unique(watchlist_id, provider_server_id)
    ASSERT (SELECT EXISTS(
        SELECT 1 FROM pg_index i
        JOIN pg_class c ON c.oid = i.indrelid
        JOIN pg_attribute a ON a.attrelid = c.oid AND a.attnum = ANY(i.indkey)
        WHERE c.relname = 'watchlist_items' AND i.indisunique = true
        GROUP BY i.indexrelid
        HAVING string_agg(a.attname, ',' ORDER BY a.attname) = 'provider_server_id,watchlist_id'
    ));

    -- alert_events unique(user_id, dedup_key)
    ASSERT (SELECT EXISTS(
        SELECT 1 FROM pg_index i
        JOIN pg_class c ON c.oid = i.indrelid
        JOIN pg_attribute a ON a.attrelid = c.oid AND a.attnum = ANY(i.indkey)
        WHERE c.relname = 'alert_events' AND i.indisunique = true
        GROUP BY i.indexrelid
        HAVING string_agg(a.attname, ',' ORDER BY a.attname) = 'dedup_key,user_id'
    ));
    
    -- D) Grant Checks
    -- Provider Tabellen
    IF NOT has_table_privilege('anon', 'public.provider_servers', 'SELECT') THEN
        RAISE EXCEPTION 'Grant violation: anon missing SELECT on public.provider_servers';
    END IF;
    IF NOT has_table_privilege('authenticated', 'public.provider_servers', 'SELECT') THEN
        RAISE EXCEPTION 'Grant violation: authenticated missing SELECT on public.provider_servers';
    END IF;
    IF NOT has_table_privilege('anon', 'public.provider_source_status', 'SELECT') THEN
        RAISE EXCEPTION 'Grant violation: anon missing SELECT on public.provider_source_status';
    END IF;
    IF NOT has_table_privilege('authenticated', 'public.provider_source_status', 'SELECT') THEN
        RAISE EXCEPTION 'Grant violation: authenticated missing SELECT on public.provider_source_status';
    END IF;

    IF has_table_privilege('anon', 'public.provider_servers', 'INSERT') OR has_table_privilege('anon', 'public.provider_servers', 'UPDATE') OR has_table_privilege('anon', 'public.provider_servers', 'DELETE') THEN
        RAISE EXCEPTION 'Grant violation: anon has write access on public.provider_servers';
    END IF;
    IF has_table_privilege('authenticated', 'public.provider_servers', 'INSERT') OR has_table_privilege('authenticated', 'public.provider_servers', 'UPDATE') OR has_table_privilege('authenticated', 'public.provider_servers', 'DELETE') THEN
        RAISE EXCEPTION 'Grant violation: authenticated has write access on public.provider_servers';
    END IF;
    IF has_table_privilege('anon', 'public.provider_source_status', 'INSERT') OR has_table_privilege('anon', 'public.provider_source_status', 'UPDATE') OR has_table_privilege('anon', 'public.provider_source_status', 'DELETE') THEN
        RAISE EXCEPTION 'Grant violation: anon has write access on public.provider_source_status';
    END IF;
    IF has_table_privilege('authenticated', 'public.provider_source_status', 'INSERT') OR has_table_privilege('authenticated', 'public.provider_source_status', 'UPDATE') OR has_table_privilege('authenticated', 'public.provider_source_status', 'DELETE') THEN
        RAISE EXCEPTION 'Grant violation: authenticated has write access on public.provider_source_status';
    END IF;

    -- User-owned Tabellen
    IF NOT has_table_privilege('authenticated', 'public.profiles', 'SELECT') THEN
        RAISE EXCEPTION 'Grant violation: authenticated missing SELECT on public.profiles';
    END IF;
    IF NOT has_table_privilege('authenticated', 'public.user_watchlists', 'SELECT') THEN
        RAISE EXCEPTION 'Grant violation: authenticated missing SELECT on public.user_watchlists';
    END IF;
    IF NOT has_table_privilege('authenticated', 'public.watchlist_items', 'SELECT') THEN
        RAISE EXCEPTION 'Grant violation: authenticated missing SELECT on public.watchlist_items';
    END IF;
    IF NOT has_table_privilege('authenticated', 'public.alert_rules', 'SELECT') THEN
        RAISE EXCEPTION 'Grant violation: authenticated missing SELECT on public.alert_rules';
    END IF;

    IF has_table_privilege('anon', 'public.profiles', 'SELECT') OR has_table_privilege('anon', 'public.user_watchlists', 'SELECT') OR has_table_privilege('anon', 'public.watchlist_items', 'SELECT') OR has_table_privilege('anon', 'public.alert_rules', 'SELECT') OR has_table_privilege('anon', 'public.alert_events', 'SELECT') THEN
        RAISE EXCEPTION 'Grant violation: anon has SELECT access on user-owned tables';
    END IF;

    -- alert_events
    IF NOT has_table_privilege('authenticated', 'public.alert_events', 'SELECT') THEN
        RAISE EXCEPTION 'Grant violation: authenticated missing SELECT on public.alert_events';
    END IF;
    IF has_table_privilege('authenticated', 'public.alert_events', 'INSERT') THEN
        RAISE EXCEPTION 'Grant violation: authenticated has INSERT on public.alert_events';
    END IF;
    IF has_table_privilege('authenticated', 'public.alert_events', 'UPDATE') THEN
        RAISE EXCEPTION 'Grant violation: authenticated has UPDATE on public.alert_events';
    END IF;
    IF has_table_privilege('authenticated', 'public.alert_events', 'DELETE') THEN
        RAISE EXCEPTION 'Grant violation: authenticated has DELETE on public.alert_events';
    END IF;

END $$;


-- E) Verhaltensmatrix (RLS Test Matrix)
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
    
    -- insert users (may fail remote if we can't write to auth.users, but usually postgres admin can)
    INSERT INTO auth.users (id, email) VALUES (user_a_id, 'userA_test@example.com'), (user_b_id, 'userB_test@example.com') ON CONFLICT DO NOTHING;

    -- insert profiles
    INSERT INTO public.profiles (id, username, avatar_url) VALUES (user_a_id, 'UserA_Test', 'urlA') ON CONFLICT DO NOTHING;
    INSERT INTO public.profiles (id, username, avatar_url) VALUES (user_b_id, 'UserB_Test', 'urlB') ON CONFLICT DO NOTHING;

    -- insert provider servers
    INSERT INTO public.provider_servers (id, provider_type, provider_id, name, country, status) 
    VALUES 
    (provider_server_id_1, 'battlemetrics', 'bm_test_1', 'Server Test 1', 'US', 'online'),
    (provider_server_id_2, 'battlemetrics', 'bm_test_2', 'Server Test 2', 'US', 'online')
    ON CONFLICT (provider_type, provider_id) DO NOTHING;

    -- insert provider source status
    INSERT INTO public.provider_source_status (provider_type, last_check_at, status) VALUES ('battlemetrics', now(), 'pending')
    ON CONFLICT (provider_type) DO NOTHING;

    -- insert user watchlists
    INSERT INTO public.user_watchlists (id, user_id, name, is_default) VALUES (watchlist_a_id, user_a_id, 'Watchlist A', true) ON CONFLICT DO NOTHING;
    INSERT INTO public.user_watchlists (id, user_id, name, is_default) VALUES (watchlist_b_id, user_b_id, 'Watchlist B', true) ON CONFLICT DO NOTHING;

    -- insert watchlist items
    INSERT INTO public.watchlist_items (watchlist_id, provider_server_id) VALUES (watchlist_a_id, provider_server_id_1) ON CONFLICT DO NOTHING;
    INSERT INTO public.watchlist_items (watchlist_id, provider_server_id) VALUES (watchlist_b_id, provider_server_id_2) ON CONFLICT DO NOTHING;

    -- insert alert rules
    INSERT INTO public.alert_rules (user_id, provider_server_id, rule_type, threshold_value) 
    VALUES (user_a_id, provider_server_id_1, 'population_spike', 100) ON CONFLICT DO NOTHING;

    -- insert alert events
    INSERT INTO public.alert_events (user_id, alert_rule_id, status, message, dedup_key)
    VALUES (user_a_id, (SELECT id FROM public.alert_rules WHERE user_id = user_a_id LIMIT 1), 'unread', 'event a', 'dedup_test_a') ON CONFLICT DO NOTHING;
    
    INSERT INTO public.alert_events (user_id, alert_rule_id, status, message, dedup_key)
    VALUES (user_b_id, (SELECT id FROM public.alert_rules WHERE user_id = user_a_id LIMIT 1), 'unread', 'event b', 'dedup_test_b') ON CONFLICT DO NOTHING;
END $$;


-- C) RLS Test Matrix Execution
DO $$
DECLARE
    user_a_id uuid := '00000000-0000-0000-0000-00000000000a';
    user_b_id uuid := '00000000-0000-0000-0000-00000000000b';
    provider_server_id_1 uuid := '11111111-1111-1111-1111-111111111111';
    provider_server_id_2 uuid := '22222222-2222-2222-2222-222222222222';
    watchlist_b_id uuid := 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
    count_res int;
BEGIN

    -------------------------------------------------
    -- AUTHENTICATED USER A
    -------------------------------------------------
    PERFORM set_config('role', 'authenticated', true);
    PERFORM set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-00000000000a","role":"authenticated"}', true);

    -- 1. authenticated User A sieht nur eigene user_watchlists.
    SELECT count(*) INTO count_res FROM public.user_watchlists WHERE user_id = user_a_id;
    IF count_res < 1 THEN RAISE EXCEPTION 'RLS LEAK: Case 1 Failed'; END IF;

    -- 2. authenticated User A sieht keine User-B user_watchlists.
    SELECT count(*) INTO count_res FROM public.user_watchlists WHERE user_id = user_b_id;
    IF count_res <> 0 THEN RAISE EXCEPTION 'RLS LEAK: Case 2 Failed'; END IF;

    -- 3. authenticated User A kann eigenes watchlist_item insertieren.
    INSERT INTO public.watchlist_items (watchlist_id, provider_server_id) 
    SELECT id, provider_server_id_2 FROM public.user_watchlists WHERE user_id = user_a_id LIMIT 1
    ON CONFLICT DO NOTHING;

    -- 4. authenticated User A kann kein watchlist_item in User-B Watchlist insertieren.
    BEGIN
        -- Setting all NOT NULL columns explicitly
        INSERT INTO public.watchlist_items (watchlist_id, provider_server_id) VALUES (watchlist_b_id, provider_server_id_1);
        RAISE EXCEPTION 'RLS LEAK: Case 4 Failed - Insert allowed!';
    EXCEPTION WHEN insufficient_privilege THEN
        -- Expected SQLSTATE 42501
    END;

    -- 5. authenticated User A sieht keine User-B watchlist_items.
    SELECT count(*) INTO count_res FROM public.watchlist_items WHERE watchlist_id = watchlist_b_id;
    IF count_res <> 0 THEN RAISE EXCEPTION 'RLS LEAK: Case 5 Failed'; END IF;

    -- 6. authenticated User A kann eigenes watchlist_item löschen.
    DELETE FROM public.watchlist_items WHERE provider_server_id = provider_server_id_2 AND watchlist_id IN (SELECT id FROM public.user_watchlists WHERE user_id = user_a_id);

    -- 7. authenticated User A sieht nur eigene alert_events.
    SELECT count(*) INTO count_res FROM public.alert_events WHERE user_id = user_a_id;
    IF count_res < 1 THEN RAISE EXCEPTION 'RLS LEAK: Case 7 Failed'; END IF;

    -- 8. authenticated User A sieht keine User-B alert_events.
    SELECT count(*) INTO count_res FROM public.alert_events WHERE user_id = user_b_id;
    IF count_res <> 0 THEN RAISE EXCEPTION 'RLS LEAK: Case 8 Failed'; END IF;

    -- 9. authenticated User A kann kein alert_event clientseitig insertieren.
    BEGIN
        -- Set all NOT NULL columns!
        INSERT INTO public.alert_events (user_id, alert_rule_id, status, message, dedup_key) 
        VALUES (user_a_id, (SELECT id FROM public.alert_rules LIMIT 1), 'unread', 'test', 'dedup_test');
        RAISE EXCEPTION 'RLS LEAK: Case 9 Failed - Insert allowed!';
    EXCEPTION WHEN insufficient_privilege THEN
        -- Expected SQLSTATE 42501
    END;

    -- 9b. authenticated User A kann kein alert_event clientseitig updaten.
    BEGIN
        UPDATE public.alert_events SET status = 'read' WHERE user_id = user_a_id;
        RAISE EXCEPTION 'RLS LEAK: Case 9b Failed - Update allowed!';
    EXCEPTION WHEN insufficient_privilege THEN
        -- Expected SQLSTATE 42501
    END;

    -- 9c. authenticated User A kann kein alert_event clientseitig löschen.
    BEGIN
        DELETE FROM public.alert_events WHERE user_id = user_a_id;
        RAISE EXCEPTION 'RLS LEAK: Case 9c Failed - Delete allowed!';
    EXCEPTION WHEN insufficient_privilege THEN
        -- Expected SQLSTATE 42501
    END;

    -- 10. authenticated User A sieht nur eigenes profile.
    SELECT count(*) INTO count_res FROM public.profiles WHERE id = user_a_id;
    IF count_res < 1 THEN RAISE EXCEPTION 'RLS LEAK: Case 10 Failed'; END IF;

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
        INSERT INTO public.provider_servers (provider_type, provider_id, name, status) VALUES ('test', 't1', 't', 'online');
        RAISE EXCEPTION 'RLS LEAK: Case 13 Failed - Insert allowed!';
    EXCEPTION WHEN insufficient_privilege THEN
        -- Expected
    END;

    -- 14. anon kann provider_source_status lesen.
    SELECT count(*) INTO count_res FROM public.provider_source_status;
    IF count_res = 0 THEN RAISE EXCEPTION 'RLS LEAK: Case 14 Failed'; END IF;

    -- 15. anon/auth kann provider_source_status nicht insertieren.
    BEGIN
        INSERT INTO public.provider_source_status (provider_type, status) VALUES ('test2', 'pending');
        RAISE EXCEPTION 'RLS LEAK: Case 15 Failed - Insert allowed!';
    EXCEPTION WHEN insufficient_privilege THEN
        -- Expected
    END;

    -- 16. anon sieht keine user_watchlists.
    BEGIN
        SELECT count(*) INTO count_res FROM public.user_watchlists;
        RAISE EXCEPTION 'RLS LEAK: Case 16 Failed - SELECT allowed but should be denied by GRANT!';
    EXCEPTION WHEN insufficient_privilege THEN
        -- Expected
    END;

END $$;

ROLLBACK;
