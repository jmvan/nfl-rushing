from .models import NflPlayer
from json import load
from typing import Dict, List


def ingest_csv(file_path: str) -> List[NflPlayer]:
    """
    :param file_path: The file path provided by the Settings object.
    :return: A list of NFL players and their rushing statistics.
    """
    json_file = open(file_path)
    json_obj = load(json_file)
    json_file.close()
    player_list = []
    for player in json_obj:
        new_player = NflPlayer(player)
        player_list.append(new_player)
    return player_list


class RushingDatastore:
    """
    This class represents the Datastore and its capabilities (filer, sort, and paginate).
    """
    def __init__(self, player_list: List[NflPlayer]) -> None:
        self.player_list: List[NflPlayer] = player_list

    def filter_data(self, filter_name: str) -> None:
        filtered_list = []
        for player in self.player_list:
            if filter_name.lower() in player.name.lower():  # case insensitive
                filtered_list.append(player)
        self.player_list = filtered_list

    def sort_data(self, sort_field: str, sort_order: bool) -> None:
        self.player_list = sorted(
            self.player_list,
            key=lambda player: getattr(player, sort_field),
            reverse=sort_order
        )

    def get_last_page(self, page_size: int) -> int:
        player_list_size = len(self.player_list)
        if player_list_size % page_size == 0:
            return player_list_size // page_size
        return (player_list_size // page_size) + 1

    def get_paginated_data(self, page_num: int, page_size: int) -> List[Dict]:
        start_record = (page_num - 1) * page_size
        end_record = (page_num - 1) * page_size + page_size
        if end_record > len(self.player_list):
            end_record = len(self.player_list)
        player_list = self.player_list[start_record:end_record]
        dict_list = []
        for player in player_list:
            dict_list.append(player.convert_to_dict())
        return dict_list
