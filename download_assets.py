import requests
import json 
import os

def cdragonPath(path: str) :
    return path.lower().replace("/lol-game-data/assets/", "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/")

def downlaodIntoPath(filePath: str, downloadPath: str):

    os.makedirs(os.path.dirname(filePath), exist_ok=True)

    print(f"downloading {downloadPath}")

    r = requests.get(downloadPath, allow_redirects=True)
    open(filePath, 'wb').write(r.content)


print("loading communitydragon data")

setMutator = "TFTSet9_Stage2"
jsonDir = "./src/data/"
staticDir = "./static/"

res = requests.get('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json')
champions = json.loads(res.text)

# for c in champions:
#     if c["id"] > 0 and c["squarePortraitPath"]:
#         # download tile image
#         path = c["squarePortraitPath"].lower()
#         downlaodIntoPath(staticDir + path, cdragonPath(path))

with open(jsonDir + "champions.json", "w") as outfile:
    outfile.write(json.dumps(champions, separators=(',', ':')))

res = requests.get('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/summoner-spells.json')
spells = json.loads(res.text)

# for s in spells:
#     if s["id"] > 0 and s["iconPath"]:
#         # download tile image
#         path = s["iconPath"].lower()
#         downlaodIntoPath(staticDir + path, cdragonPath(path))

with open(jsonDir + "spells.json", "w") as outfile:
    outfile.write(json.dumps(spells, separators=(',', ':')))
