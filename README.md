[![Waffle.io - Columns and their card count](https://badge.waffle.io/acdc-1802/pintrips.png?columns=all)](https://waffle.io/acdc-1802/pintrips?utm_source=badge)

### Pintrips ###

Create a board, add collaborators, and start pinning your next trip! 

Pintrips is a progressive web app that allows users to plan for and journal trips by dropping custom pins to mark places they would like to go and places that they've been on individual 'place boards'. These boards, rendered with a React binding of MapboxGl, are shareable and can have multiple collaborators and styles. The real-time collaboration is possible because of the use of Google's Cloud Firestore, which allows board components to listen for any changes and automatically update when they happen. The app also uses service workers to give offline functionality to users while traveling so they can journal even in remote locations. At any point in the trip, users can send their pinned and styled boards as an online postcard that uses app geolocation and GreenSock animation to stamp and send to family and friends!


# Features #

- Create an account and add friends

- Create, name, and start adding pins to your board

- Add collaborators to your board, and edit together in real-time

- Choose from two types of pins: planning and journaling

- Once you visit your planned pins, you can mark them as visited and they will be connected chronologically with the others

- Add and edit custom labels and notes on individual pins 

- Choose from a number of map styles

- Check out your and your friends' profiles and see every place you've ever visited all in one map

- Send a postcard of your trip along with a personal message to anyone with an email address 

- Save the app to your phone and you'll never need visit the browser again


# In Progress #

- A full list of your pins will be accessible the side of your board view, allowing you to easily navigate to pins you've previously added

- Searching within a board will narrow the search suggestions to that board's location

- Starred boards will save all of your favorites to one place

- Date and time will be displayed on visited pins, and ability to edit time if a pin is forgotten or edited by mistake
