from pydantic import BaseSettings


class DatabaseSettings(BaseSettings):
    DB_FILE_PATH: str = "./data/rushing.json"


class Settings(DatabaseSettings):
    pass
