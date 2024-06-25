import os

default_data = os.path.join(os.path.dirname(__file__), "../data")
data_root = os.path.abspath(os.environ.get("DATA_FOLDER", default_data))

# Costruisco il percorso ai file csv
stato_lavori_path = os.path.join(data_root, "stato_lavori.csv")
italy_geo_path = os.path.join(data_root, "italy_geo.csv")
pcn_route_path = os.path.join(data_root, "pcn_route.csv")


def load_config():
    return {
        "italy_geo": italy_geo_path,
        "pcn_route": pcn_route_path,
        "stato_lavori": stato_lavori_path,
    }


cfg = load_config()
