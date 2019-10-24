
# MOK_Rental - DB project

![Hello](https://media.giphy.com/media/IgKziLLX1SDeFXAZba/giphy.gif)

[Heroku](https://mok-car-rentals.herokuapp.com/)


### `how to install`

You can clone the repo by typing the command

```console
> git clone https://github.com/okarem/MOK_Rental.git
> cd MOK_Rental
> npm i
```
### `how to test`
Run the test command

```console
> npm test
```

*note: to use the app you need to make a database and initialize it
go to `config.env` and change it to your credentials
preform `node ./src/database/db_duild.js`


## tables in our database

### cars
|   car_id   | model | plate_number | imgurl |
| -------- | -------- | -------- |--------|


### rentals
| rental_id | car_id | user_id | date_begin | date_return |
| ----- | ----- | ----- | ----- | -----|

### users 
| user_id | first_name | last_name | city | phone |
| ----- | ----- | ----- | ----- | -----|


### example for one table :
|   user_id | first_name   | last_name   | city    | phone      |
|----------- | -------------- | ------------- | --------- | ------------|
|         1 | Omri         | Zaher       | Osfia   | 0526086317 |
|         2 | Karem        | Omary       | Sandala | 0544791675 |

![](https://i.imgur.com/kdQYkSF.png)

## we're proud of
* sql managment and lack of sql crashes :D
* our request handling done through our own request handling module
* input validation checks
* notifications (relates to above)
* it's pretty

## Stretch goals: 
* more emphasis on security
* more code refactoring
* better readme
* more user friendly insertion of cars (a GUI)
