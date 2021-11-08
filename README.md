# theScore "the Rush" Interview Challenge
At theScore, we are always looking for intelligent, resourceful, full-stack developers to join our growing team. To help us evaluate new talent, we have created this take-home interview question. This question should take you no more than a few hours.

**All candidates must complete this before the possibility of an in-person interview. During the in-person interview, your submitted project will be used as the base for further extensions.**

### Why a take-home challenge?
In-person coding interviews can be stressful and can hide some people's full potential. A take-home gives you a chance work in a less stressful environment and showcase your talent.

We want you to be at your best and most comfortable.

### A bit about our tech stack
As outlined in our job description, you will come across technologies which include a server-side web framework (like Elixir/Phoenix, Ruby on Rails or a modern Javascript framework) and a front-end Javascript framework (like ReactJS)

### Challenge Background
We have sets of records representing football players' rushing statistics. All records have the following attributes:
* `Player` (Player's name)
* `Team` (Player's team abbreviation)
* `Pos` (Player's postion)
* `Att/G` (Rushing Attempts Per Game Average)
* `Att` (Rushing Attempts)
* `Yds` (Total Rushing Yards)
* `Avg` (Rushing Average Yards Per Attempt)
* `Yds/G` (Rushing Yards Per Game)
* `TD` (Total Rushing Touchdowns)
* `Lng` (Longest Rush -- a `T` represents a touchdown occurred)
* `1st` (Rushing First Downs)
* `1st%` (Rushing First Down Percentage)
* `20+` (Rushing 20+ Yards Each)
* `40+` (Rushing 40+ Yards Each)
* `FUM` (Rushing Fumbles)

In this repo is a sample data file [`rushing.json`](/rushing.json).

##### Challenge Requirements
1. Create a web app. This must be able to do the following steps
    1. Create a webpage which displays a table with the contents of [`rushing.json`](/rushing.json)
    2. The user should be able to sort the players by _Total Rushing Yards_, _Longest Rush_ and _Total Rushing Touchdowns_
    3. The user should be able to filter by the player's name
    4. The user should be able to download the sorted data as a CSV, as well as a filtered subset
    
2. The system should be able to potentially support larger sets of data on the order of 10k records.

3. Update the section `Installation and running this solution` in the README file explaining how to run your code

### Submitting a solution
1. Download this repo
2. Complete the problem outlined in the `Requirements` section
3. In your personal public GitHub repo, create a new public repo with this implementation
4. Provide this link to your contact at theScore

We will evaluate you on your ability to solve the problem defined in the requirements section as well as your choice of frameworks, and general coding style.

### Help
If you have any questions regarding requirements, do not hesitate to email your contact at theScore for clarification.

# Installation and running this solution

This full stack web app was built using Python 3 (FastAPI) and Javascript (React Redux).

![Screen Shot 2021-11-07 at 6 09 11 PM](https://user-images.githubusercontent.com/26910018/140673557-16ad2ff1-2823-4613-b412-8be5736fb8e8.png)

## Server Setup

```
cd server
pip install -r requirements.txt
python main.py
```

Navigating to the browser page below will allow you to view the API contract.
```
http://localhost:8000/docs
```

## Client Setup

```
cd client
npm install
npm run start
```

Navigating to the browser page will allow you to view the web app.
```
http://localhost:3000/
```

## Testing for Server

From the root directory:
```
cd server
python -m unittest -v test_main.py
```

## Design Considerations

For the backend, I used FastAPI because I have previously used it at Hackathons for making small/fast projects. The documentation page provided by FastAPI also makes it easy to debug with the reloading option enabled. For larger projects, I would favor using an actual database (PostgreSQL) instead of parsing the csv every query. I introduced server side filtering/sorting/paginating because it would reduce the load for client side processing. In terms of testing, I prefer parameterized tests because it reduces complexity. Initially, I wanted to use pytest and put the test cases in a separate folder (/tests). I ended up using the parameterized library instead because I had some difficulty getting pytest to work.

For the frontend, I used React and Redux because I am most familiar with it. Redux isn't necessary for a small project but I prefer using it because it makes state much more manageable and it allows you to scale your application better for future development.

API Contract
```
http://localhost:8000/api/rushing/?page_num={}&page_size={}&filter_name={}&sort_field={}&sort_order={}
```


