# BattleMetrics Field Map

| BattleMetrics field/path | Example meaning | RustMasterTool normalized field | Used in v1? | Store in DB? | Display in UI? | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| id | Server ID | id | yes | yes | yes | String, pattern \d+ |
| attributes.name | Server Name | name | yes | yes | yes | |
| relationships.game.data.id | Game | game | yes | yes | no | Filter filter[game]=rust |
| attributes.address / attributes.ip | IP Address | ip | yes | yes | yes | |
| attributes.port | Game Port | port | yes | yes | yes | |
| attributes.portQuery | Query Port | query_port | yes | yes | no | |
| attributes.country | Location | country | yes | yes | yes | |
| attributes.players | Current players | players | yes | yes | yes | |
| attributes.maxPlayers | Max players | max_players | yes | yes | yes | |
| attributes.details.rust_queued_players | Queue size | queue | yes | yes | yes | In details object (unknown/undocumented schema) |
| attributes.rank | Server rank | rank | yes | yes | yes | Can be null |
| attributes.status | Status | status | yes | yes | yes | online/offline/dead/removed/invalid |
| attributes.details.map | Map name | map_name | yes | yes | yes | In details object |
| attributes.details.rust_world_seed | World seed | world_seed | yes | yes | yes | In details object |
| attributes.details.rust_world_size | World size | world_size | yes | yes | yes | In details object |
| attributes.details.rust_last_wipe | Last wipe | last_wipe | yes | yes | yes | In details object |
| attributes.details.rust_headerimage | Header Image | header_image | yes | yes | yes | In details object |
| attributes.details.rust_fps | FPS | fps | maybe | gated | gated | In details object |
| attributes.details.rust_fps_avg | Average FPS | fps_avg | maybe | gated | gated | In details object |
| attributes.details.rust_ent_cnt_i | Entity count | entity_count | maybe | gated | gated | In details object |
| attributes.details.rust_description | Description | description | yes | yes | yes | In details object |
| Player Data (e.g. relationships.player) | Player Tracking | N/A | no | no | no | Excluded for v1 |
| Session Data (e.g. relationships.session) | Session Tracking | N/A | no | no | no | Excluded for v1 |
| Private Data | Private Info | N/A | no | no | no | Excluded for v1 |
