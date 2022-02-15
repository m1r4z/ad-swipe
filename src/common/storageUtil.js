import { v4 as uuidV4 } from "uuid";
import { PROJECT_NAME } from "./constant";

export const getDataFromStorage = (key) => {
	key = key ?? PROJECT_NAME;
	return new Promise((resolve, reject) => {
		chrome.storage.sync.get([key], (res) => {
			if (!res[key]) resolve(null);
			else {
				resolve(res[key]?.results);
			}
		});
	});
};

export const setDataInStorage = ( key, value) => {
	key = key ?? PROJECT_NAME;
	return new Promise((resolve, reject) => {
		chrome.storage.sync.set({ [key]: { id: uuidV4(), results: value } }, (res) => {
			console.log("Value set " + key + " ", value);
			resolve(null);
		});
	});
};

export const addStorageChangeListener = (listener) => {
	chrome.storage.onChanged.addListener(listener);
};

export const removeStorageChangeListener = (listener) => {
	chrome.storage.onChanged.removeListener(listener);
};

export const getDataFromLocalStorage = (key) => {
	key = key ?? PROJECT_NAME;
	return JSON.parse(localStorage.getItem(key));
};

export const setDataInLocalStorage = (key, value) => {
	key = key ?? PROJECT_NAME;
	return localStorage.setItem(key, JSON.stringify(value));
};

export const addLocalStorageChangeListener = (listener) => {
	window.addEventListener("storage", listener);
};

export const removeLocalStorageChangeListener = (listener) => {
	window.removeEventListener("storage", listener);
};