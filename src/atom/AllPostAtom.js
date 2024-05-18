import { atom } from 'recoil';

export const AllPost = atom({
    key: 'AllPost',
    default: []
})

export const searchedPost = atom({
    key: 'searchdPost',
    default: []
})