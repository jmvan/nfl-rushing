import unittest
from config import Settings
from main import app, get_settings
from fastapi.testclient import TestClient
from parameterized import parameterized
from typing import Dict, List

client = TestClient(app)


def get_settings_override():
    return Settings(DB_FILE_PATH="data/test_input_five.json")


app.dependency_overrides[get_settings] = get_settings_override

player_one = {
    "Player": "Tom Brady",
    "Team": "NE",
    "Pos": "QB",
    "Att": 2.3,
    "Att/G": 28,
    "Yds": 64,
    "Avg": 2.3,
    "Yds/G": 5.3,
    "TD": 0,
    "Lng": "15",
    "1st": 10,
    "1st%": 35.7,
    "20+": 0,
    "40+": 0,
    "FUM": 1
}
player_two = {
    "Player": "Chris Moore",
    "Team": "BAL",
    "Pos": "WR",
    "Att": 0.2,
    "Att/G": 3,
    "Yds": 19,
    "Avg": 6.3,
    "Yds/G": 1.3,
    "TD": 0,
    "Lng": "10",
    "1st": 1,
    "1st%": 33.3,
    "20+": 0,
    "40+": 0,
    "FUM": 0
}
player_three = {
    "Player": "Chris Prosinski",
    "Team": "CHI",
    "Pos": "SS",
    "Att": 0.1,
    "Att/G": 1,
    "Yds": 2,
    "Avg": 2,
    "Yds/G": 0.1,
    "TD": 0,
    "Lng": "2",
    "1st": 1,
    "1st%": 100,
    "20+": 0,
    "40+": 0,
    "FUM": 0
}
player_four = {
    "Player": "Chris Thompson",
    "Team": "WAS",
    "Pos": "RB",
    "Att": 4.2,
    "Att/G": 68,
    "Yds": 356,
    "Avg": 5.2,
    "Yds/G": 22.2,
    "TD": 3,
    "Lng": "25T",
    "1st": 16,
    "1st%": 23.5,
    "20+": 2,
    "40+": 0,
    "FUM": 1
}
player_five = {
    "Player": "Christine Michael",
    "Team": "GB",
    "Pos": "RB",
    "Att": 5.2,
    "Att/G": 31,
    "Yds": 114,
    "Avg": 3.7,
    "Yds/G": 19,
    "TD": 1,
    "Lng": "42T",
    "1st": 5,
    "1st%": 16.1,
    "20+": 1,
    "40+": 1,
    "FUM": 0
}


class TestGetRushingStats(unittest.TestCase):
    """
    A class used for testing the get_rushing_stats() API using unittest/parameterized.
    """

    def test_default_inputs(self):
        response = client.get("/api/rushing/")
        expected_player_list = [player_two, player_three, player_four, player_five, player_one]
        assert response.status_code == 200
        assert response.json()["player_list"] == expected_player_list

    @parameterized.expand([
        ("page 1 of page size 3", 1, 3, [player_two, player_three, player_four]),
        ("page 2 of page size 3", 2, 3, [player_five, player_one]),
    ])
    def test_page_num(self, desc: str, page_num: int, page_size: int, expected_player_list: List[Dict]):
        request_url = (
            f'/api/rushing/?'
            f'page_num={page_num}&'
            f'page_size={page_size}'
        )
        response = client.get(request_url)
        assert response.status_code == 200
        assert response.json()["player_list"] == expected_player_list

    @parameterized.expand([
        ("page 1 of page size 1", 1, 1, [player_two]),
        ("page 1 of page size 3", 1, 3, [player_two, player_three, player_four]),
        ("page 1 of page size 5", 1, 5, [player_two, player_three, player_four, player_five, player_one]),
    ])
    def test_page_size(self, desc: str, page_num: int, page_size: int, expected_player_list: List[Dict]):
        request_url = (
            f'/api/rushing/?'
            f'page_num={page_num}&'
            f'page_size={page_size}'
        )
        response = client.get(request_url)
        assert response.status_code == 200
        assert response.json()["player_list"] == expected_player_list

    @parameterized.expand([
        ("filtering by name tom", "tom", [player_one]),
        ("filtering by name chris", "chris", [player_two, player_three, player_four, player_five]),
        ("filtering with case insensitive", "cHrI", [player_two, player_three, player_four, player_five]),
        ("filtering with no results", "garoppolo", [])
    ])
    def test_filter_name(self, desc: str, filter_name: str, expected_player_list: List[Dict]):
        request_url = (
            f'/api/rushing/?'
            f'filter_name={filter_name}'
        )
        response = client.get(request_url)
        assert response.status_code == 200
        assert response.json()["player_list"] == expected_player_list

    @parameterized.expand([
        ("sort by total rushing yards", "yds", [player_three, player_two, player_one, player_five, player_four]),
        ("sort by longest rush", "lng", [player_three, player_two, player_one, player_four, player_five]),
        ("sort by total rushing touchdowns", "td", [player_one, player_two, player_three, player_five, player_four]),
    ])
    def test_sort_field(self, desc: str, sort_field: str, expected_player_list: List[Dict]):
        request_url = (
            f'/api/rushing/?'
            f'sort_field={sort_field}'
        )
        response = client.get(request_url)
        assert response.status_code == 200
        assert response.json()["player_list"] == expected_player_list

    @parameterized.expand([
        ("sort by ascending", False, [player_two, player_three, player_four, player_five, player_one]),
        ("sort by descending", True, [player_one, player_five, player_four, player_three, player_two]),
    ])
    def test_sort_order(self, desc: str, sort_order: bool, expected_player_list: List[Dict]):
        request_url = (
            f'/api/rushing/?'
            f'sort_order={sort_order}'
        )
        response = client.get(request_url)
        assert response.status_code == 200
        assert response.json()["player_list"] == expected_player_list


if __name__ == '__main__':
    unittest.main()
