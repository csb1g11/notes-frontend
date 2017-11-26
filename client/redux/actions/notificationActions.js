import axios from "axios";
import { SUCCESSFUL_ACTION, REJECTED_ACTION, INFO_ACTION } from './types';

export const notifySuccess = (text) => { return { type: SUCCESSFUL_ACTION, text: text }};

export const notifyRejected = (text) => { return { type: REJECTED_ACTION, text: text }};

export const notifyInfo =(text) => { return { type: INFO_ACTION, text: text }};