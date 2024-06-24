import os

# Ottiengo il percorso assoluto della directory principale del progetto
project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../"))

# Costruisco il percorso assoluto ai file csv
stato_lavori_path = os.path.join(project_root, "resources", "stato_lavori.csv")
italy_geo_path = os.path.join(project_root, "resources", "italy_geo.csv")
pcn_route_path = os.path.join(project_root, "resources", "pcn_route.csv")


# Imposto una funzione che mi ritorni le path dei file csv in un dizionario
def load_config():
    # print(stato_lavori_path)
    return {
        "italy_geo": italy_geo_path,
        "pcn_route": pcn_route_path,
        "stato_lavori": stato_lavori_path,
    }


cfg = load_config()
