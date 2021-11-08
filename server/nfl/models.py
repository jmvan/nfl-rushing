from enum import Enum
from typing import Dict


class SortOrder(Enum):
    ASC = False
    DESC = True


class SortField(Enum):
    NAME = "name"
    YDS = "yds"
    TD = "td"
    LNG = "lng"


class TotalRushingYards:
    """
    This class is used for sorting the 'yds' field in the database.
    """
    def __init__(self, yds):
        self.yds = yds

    def __lt__(self, other):
        self_value = str(self.yds).replace(',', '')
        other_value = str(other.yds).replace(',', '')
        return float(self_value) < float(other_value)


class LongestRush:
    """
    This class is used for sorting the 'lng' field in the database.
    """
    def __init__(self, lng):
        self.lng = lng

    def __lt__(self, other):
        self_value = str(self.lng).replace('T', '')
        other_value = str(other.lng).replace('T', '')
        return int(self_value) < int(other_value)


class NflPlayer:
    """
    This class represents the data model for a NFL player in the database.
    """
    def __init__(self, json_obj) -> None:
        self.name: str = json_obj['Player']
        self.team: str = json_obj['Team']
        self.position: str = json_obj['Pos']
        self.att_g: float = json_obj['Att/G']
        self.att: int = json_obj['Att']
        self.yds: TotalRushingYards = TotalRushingYards(json_obj['Yds'])
        self.avg: float = json_obj['Avg']
        self.yds_g: float = json_obj['Yds/G']
        self.td: int = json_obj['TD']
        self.lng: LongestRush = LongestRush(json_obj['Lng'])
        self.first: int = json_obj['1st']
        self.first_p: float = json_obj['1st%']
        self.twenty_plus: int = json_obj['20+']
        self.forty_plus: int = json_obj['40+']
        self.fum: int = json_obj['FUM']

    def convert_to_dict(self) -> Dict:
        return {
            "Player": self.name,
            "Team": self.team,
            "Pos": self.position,
            "Att": self.att,
            "Att/G": self.att_g,
            "Yds": self.yds.yds,
            "Avg": self.avg,
            "Yds/G": self.yds_g,
            "TD": self.td,
            "Lng": self.lng.lng,
            "1st": self.first,
            "1st%": self.first_p,
            "20+": self.twenty_plus,
            "40+": self.forty_plus,
            "FUM": self.fum
        }
