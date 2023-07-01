// import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectCars = (state: RootState) => state.cars.list;
// export const selectFilter = (state: RootState) => state.tweets.filter;
// export const selectFollowed = (state: RootState) => state.tweets.followed;
// export const selectPagination = (state: RootState) => state.tweets.pagination;
// export const selectIsLoading = (state: RootState) => state.tweets.status === 'pending';

// export const selectFilteredTweets = createSelector(
//   [selectTweets, selectFilter, selectFollowed, selectPagination],
//   (tweets, filter, followed, { page, limit }) => {
//     let filtered: ITweet[] = [];

//     switch (filter) {
//       case 'follow':
//         filtered = tweets.filter(tweet => !followed.includes(tweet.id));
//         break;
//       case 'following':
//         filtered = tweets.filter(tweet => followed.includes(tweet.id));
//         break;
//       default:
//         filtered = tweets;
//     }

//     return {
//       list: filtered.slice(0, page * limit),
//       page,
//       totalPages: Math.ceil(filtered.length / limit),
//     };
//   }
// );
