import uvicorn
from config import Settings
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Depends, FastAPI
from functools import lru_cache
from nfl.datastore import RushingDatastore, ingest_csv
from nfl.models import SortField, SortOrder

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)


@lru_cache()
def get_settings():
    return Settings()


@app.get("/api/rushing/")
def get_rushing_stats(
        page_num: int = 1,
        page_size: int = 10,
        filter_name: str = None,
        sort_field: str = SortField.NAME.value,
        sort_order: bool = SortOrder.ASC.value,
        settings: Settings = Depends(get_settings)
):
    """
    :param page_num: An integer specifying the current page number (default: 1).
    :param page_size: An integer specifying the size of a page (default: 10).
    :param filter_name: A string representing the name that queries the database (default: None).
    :param sort_field: A string that represents the field sorted in the table (default: Player Name).
    :param sort_order: A boolean that represents if the table is sorted ascending or descending (default: ASC).
    :param settings: An object that stores the file path to the database json file.
    :return: The total number of pages, the current page number, and a list of players with rushing statistics.
    """
    player_list = ingest_csv(settings.DB_FILE_PATH)
    datastore = RushingDatastore(player_list=player_list)

    if filter_name is not None:
        datastore.filter_data(filter_name=filter_name)

    datastore.sort_data(
        sort_field=sort_field,
        sort_order=sort_order
    )

    end_page_num = datastore.get_last_page(page_size=page_size)
    paginated_player_list = datastore.get_paginated_data(
        page_num=page_num,
        page_size=page_size
    )

    return {
        "player_list": paginated_player_list,
        "total_players": len(datastore.player_list),
        "page_num": page_num,
        "end_page_num": end_page_num,
    }
    

"""
Runs the FastAPI server on Port 8080 with the reload option
"""
if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
