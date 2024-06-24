import flask
import os
from flask_cors import CORS
from modules.chart_service import *

app = flask.Flask(__name__)
CORS(app)


@app.route("/api/national-pie-chart-presence-percentage", methods=["GET"])
def endpointOne():

    response = getDataForNationalPieChartPresencePercentage().to_json()

    return response


@app.route("/api/national-column-chart-building-site-open-or-not", methods=["GET"])
def endpointTwo():

    response = getDataForNationalColumnChartBuildingSiteOpenOrNot().to_json()

    return response


@app.route(
    "/api/national-column-chart-building-site-closed-and-tested", methods=["GET"]
)
def endpointThree():

    response = getDataForNationalColumnChartBuildingSiteClosedAndTested().to_json()

    return response


@app.route("/api/national-column-chart-future-building-site", methods=["GET"])
def endpointFour():

    response = getDataForNationalColumnChartFutureBuildingSite().to_json()

    return response


@app.route("/api/national-data-grid", methods=["GET"])
def endpointFive():

    response = getDataForNationalDataGrid().to_json(orient="records")

    return response


@app.route("/api/regional-data-grid", methods=["POST"])
def endpointSix():

    region = flask.request.json["regione"]

    response = getDataForRegionalDataGrid(region).to_json(orient="records")

    return response


@app.route("/api/regional-annual-building-site", methods=["POST"])
def endpointSeven():

    typeOfTech = flask.request.json["tipo"]
    region = flask.request.json["regione"]

    if typeOfTech is not None:
        lowerType = str.lower(typeOfTech)
    else:
        lowerType = None

    response = getDataForRegionalAnnualBuildingSite(
        region=region, typeOfTech=lowerType
    ).to_json()

    return response


@app.route("/api/regional-annual-type-building-site", methods=["POST"])
def endpointEight():

    typeOfTech = flask.request.json["tipo"]
    region = flask.request.json["regione"]
    year = flask.request.json["anno"]  # Anni analizzati 2020-2021-2022

    if typeOfTech is not None:
        lowerType = str.lower(typeOfTech)
    else:
        lowerType = None

    response = getDataForRegionalAnnualTypeBuildingSite(
        region=region, year=year, typeOfTech=lowerType
    ).to_json()

    return response


@app.route("/api/regional-map-data-one", methods=["GET"])
def endpointNine():

    response = getDataOneForMap().to_json()

    return response


@app.route("/api/regional-map-data-two", methods=["GET"])
def endpointTen():

    response = getDataTwoForMap().to_json()

    return response


print(os.environ)
app.run(host="0.0.0.0", port=5000, debug=True, use_reloader=True)
