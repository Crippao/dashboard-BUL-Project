import pandas as pd
from modules.config import cfg


def get_stato_lavori():
    file_name = cfg["stato_lavori"]
    df = pd.read_csv(file_name, sep=";", encoding="UTF-8")
    return df


def get_italy_geo():
    file_name = cfg["italy_geo"]
    df = pd.read_csv(file_name, sep=";", encoding="UTF-8")
    return df


def get_pcn_route():
    file_name = cfg["pcn_route"]
    df = pd.read_csv(file_name, sep=";", encoding="UTF-8")
    return df
