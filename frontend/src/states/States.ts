import { atom, selector } from 'recoil';

export const chatHistory = atom({
    key: 'chatHistory',
    default: [],
});

export const isChatView = atom({
    key: 'isChatView',
    default: true,
});

export const chat = atom({
    key: 'chat',
    default: [],
});

export const chatDetails = atom({
    key: 'chatDetails',
    default: {},
});
