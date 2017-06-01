import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import BlitzApi from 'service/BlitzApi';
import BASE_URL from 'consts/baseUrl';
import {
MONITORING_PENDING,
MONITORING_SUCCESS,
MONITORING_FAILURE,
MONITORING_UPDATE_SUCCESS,
MONITORING_UPDATE_FAILURE,
} from 'routes/client/Dashboard/Monitoring/modules/monitoring.js';
