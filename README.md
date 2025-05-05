<pre style="white-space: pre-wrap;">

🌍 GoTrip

GoTrip is a modern travel-themed social media app where users can explore, share, and discover travel experiences around the world. Built with a modular React architecture, GoTrip includes user authentication, post feeds, favorites, and category filtering.


    ![main screenshot](./docs/main-screenshot.png)

goTrip/
└── src/
    ├── assets/
    │   ├── images/
    │   └── svgs/
    ├── components/
    │   ├── App/
    │   ├── common/
    │   ├── features/
    │   │   ├── Auth/
    │   │   ├── Feed/
    │   │   ├── Profile/
    │   │   └── NotFound/
    │   └── layouts/
    ├── hooks/
    │   └── useScrollPosition.js
    ├── routes/
    │   └── configureRouter.js
    ├── services/
    │   ├── authSrevice.js
    │   ├── favoriteSrevice.js
    │   ├── postSrevice.js
    │   ├── storageSrevice.js
    │   └── userSrevice.js
    ├── store/
    │   ├── middlewares/
    │   │   └── asyncFunctionMiddleware.js
    │   ├── modules/
    │   │   ├── authSlice.js
    │   │   └── postSlice.js
    │   └── configureStore.js
</pre>

