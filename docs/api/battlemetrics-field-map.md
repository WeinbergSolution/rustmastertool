# BattleMetrics Field Map

| BattleMetrics field/path | Example meaning | RustMasterTool normalized field | Used in v1? | Store in DB? | Display in UI? | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| id | Server ID | id | yes | yes | yes | String, pattern \d+ |
| ttributes.name | Server Name | 
ame | yes | yes | yes | |
| elationships.game.data.id | Game | game | yes | yes | no | Filter ilter[game]=rust |
| ttributes.address / ttributes.ip | IP Address | ip | yes | yes | yes | |
| ttributes.port | Game Port | port | yes | yes | yes | |
| ttributes.portQuery | Query Port | query_port | yes | yes | no | |
| ttributes.country | Location | country | yes | yes | yes | |
| ttributes.players | Current players | players | yes | yes | yes | |
| ttributes.maxPlayers | Max players | max_players | yes | yes | yes | |
| ttributes.details.rust_queued_players | Queue size | queue | yes | yes | yes | In details object (unknown/undocumented schema) |
| ttributes.rank | Server rank | ank | yes | yes | yes | Can be null |
| ttributes.status | Status | status | yes | yes | yes | online/offline/dead/removed/invalid |
| ttributes.details.map | Map name | map_name | yes | yes | yes | In details object |
| ttributes.details.rust_world_seed | World seed | world_seed | yes | yes | yes | In details object |
| ttributes.details.rust_world_size | World size | world_size | yes | yes | yes | In details object |
| ttributes.details.rust_last_wipe | Last wipe | last_wipe | yes | yes | yes | In details object |
| ttributes.details.rust_headerimage | Header Image | header_image | yes | yes | yes | In details object |
| ttributes.details.rust_fps | FPS | ps | maybe | gated | gated | In details object |
| ttributes.details.rust_fps_avg | Average FPS | ps_avg | maybe | gated | gated | In details object |
| ttributes.details.rust_ent_cnt_i | Entity count | entity_count | maybe | gated | gated | In details object |
| ttributes.details.rust_description | Description | description | yes | yes | yes | In details object |
| Player Data (e.g. elationships.player) | Player Tracking | N/A | no | no | no | Excluded for v1 |
| Session Data (e.g. elationships.session) | Session Tracking | N/A | no | no | no | Excluded for v1 |
| Private Data | Private Info | N/A | no | no | no | Excluded for v1 |
