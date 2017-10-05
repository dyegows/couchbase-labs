curl -X GET 'http://localhost:5985/veiculos/_design/main/_view/movies?end_key=true&include_docs=true&key="7d8964590c63fd8c4b358d95dd88fec3"' -H "accept: application/json" -H "Authorization: Basic NzBlMjJiY2YtMWU2Zi00MzYyLThhNDQtNWIyMTAzMzYxODYxOmQ1OGYxODg5LWZjOGItNGNiNy1hMzVkLWI3ZDE1YzFjYjliMQ=="

curl -X GET 'http://localhost:5985/veiculos/_design/main/_view/veiculosPorPlaca' -H "accept: application/json" -H "Authorization: Basic NzBlMjJiY2YtMWU2Zi00MzYyLThhNDQtNWIyMTAzMzYxODYxOmQ1OGYxODg5LWZjOGItNGNiNy1hMzVkLWI3ZDE1YzFjYjliMQ=="


curl -X GET 'http://localhost:5985/veiculos/_design/main/_view/veiculosPorPlaca?include_docs=true&key="MHG6051"' -H "accept: application/json" -H "Authorization: Basic NzBlMjJiY2YtMWU2Zi00MzYyLThhNDQtNWIyMTAzMzYxODYxOmQ1OGYxODg5LWZjOGItNGNiNy1hMzVkLWI3ZDE1YzFjYjliMQ=="


curl -X POST "http://localhost:5985/veiculos/_design/main/_view/movies" -H "accept: application/json" -H "content-type: application/json" -H "Authorization: Basic NzBlMjJiY2YtMWU2Zi00MzYyLThhNDQtNWIyMTAzMzYxODYxOmQ1OGYxODg5LWZjOGItNGNiNy1hMzVkLWI3ZDE1YzFjYjliMQ==" -d "{ \"keys\": [ \"7d8964590c63fd8c4b358d95dd88fec3\", \"89ed125c87a7d702c30af1bfe051dfb3\" ]}"


curl -X PUT "http://localhost:5985/veiculos/_design/main" -H "accept: application/json" -H "content-type: application/json" -H "Authorization: Basic NzBlMjJiY2YtMWU2Zi00MzYyLThhNDQtNWIyMTAzMzYxODYxOmQ1OGYxODg5LWZjOGItNGNiNy1hMzVkLWI3ZDE1YzFjYjliMQ==" -d "{ \"_rev\": \"1-9983b80c172bae98ef5d55b89c50de54\", \"views\": { \"movies\": { \"map\": \"function (doc) { emit(doc._id, null);}\" }, \"veiculosPorPlaca\": { \"map\": \"function (doc) { emit(doc.placa, null);}\" } }}"


curl -X PUT "http://localhost:5992/smt/" -H "accept: application/json" -H "Authorization: Basic NjNhOWQ4NzAtZTUyYy00MjYwLTlmN2QtNmY0ZjMyZGMzNDIyOjJjODZiNDgyLTg3NDctNDg2Yi04ZTFjLWExNmY5ZGJkMGZkNQ=="

curl -X DELETE "http://localhost:5992/smt/" -H "accept: application/json" -H "Authorization: Basic NjNhOWQ4NzAtZTUyYy00MjYwLTlmN2QtNmY0ZjMyZGMzNDIyOjJjODZiNDgyLTg3NDctNDg2Yi04ZTFjLWExNmY5ZGJkMGZkNQ=="

curl -X DELETE "http://localhost:5984/veiculos/d3833b1f-3aab-45c9-83c3-9e7aa8841496?rev=1-93d6b4800ea483ae72b4ab6748b115a6" -H "accept: application/json"

 time curl -X POST -H "Content-Type: application/json" -d @aa.json "http://localhost:4984/veiculos/_bulk_docs"



##### SYNC GATEWAY
curl -X GET --header 'Accept: application/json' 'http://localhost:4984/veiculos/dbd5fe66277a89f701f1773a7afb1cc4?attachments=false&revs=false&show_exp=false'

curl -X PUT --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{"_id":"dbd5fe66277a89f701f1773a7afb1cc4","_rev":"1-31a4b3c70913a535a2e1c25a8f073e8a","anoFabricacao":2006,"anoModelo":2007,"categoria":"01","chassi":"005","cor":"11","cpfCnpj":"00090321987004","especie":"01","id":"MCU4070","marcaModelo":"107421","municipio":"08113","placa":"MCU4070","proprietario":"ALESSANDRA FROM HELL 11","renavam":"00907005829","tipo":"06"}' 'http://localhost:4984/veiculos/dbd5fe66277a89f701f1773a7afb1cc4?new_edits=true&rev=11-4fe46b8f9b77af7c9c1a33daacc5ffe3'

