import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import {config, http} from '../../api/http';
import * as actions from '../actions';

describe("Registration Actions", () => {
    let mockStore, store, httpMock;

    mockStore = configureMockStore([thunk]);
    const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));

    beforeEach(() => {
        httpMock = new MockAdapter(http);
        store = mockStore();
    });

    afterEach(() => {
        store.clearActions();
    });

    it('should dispatch correct actions when single choice attributes are fetched', async () => {
        // given
        const singleChoiceAttributes = {
            "gender": [
                {
                    "id": "8f9d76ad-2c6b-4a98-8496-6165a2770a5e",
                    "name": "Male"
                },
                {
                    "id": "1969cf48-7ae7-4073-abb3-d09ba6a19946",
                    "name": "Female"
                }
            ],
            "ethnicity": [
                {
                    "id": "5b3d1252-860f-459b-ab90-7a2914360dbf",
                    "name": "White"
                },
                {
                    "id": "1b2f380e-5d70-4ada-9ad3-c6d733a1aaa4",
                    "name": "South Asian"
                }
            ]
        };

        httpMock.onGet(
            `${config.serverUrl}/en/single_choice_attributes.json`
        ).reply(200, singleChoiceAttributes);

        // when
        store.dispatch(actions.fetchSingleChoiceAttributes());
        await flushAllPromises();

        // then
        const expected = [{payload: singleChoiceAttributes, type: actions.ACTIONS.SINGLE_CHOICE_ATTR_FETCHED}];
        expect(store.getActions()).toEqual(expect.arrayContaining(expected));
    });

    it('should dispatch correct actions when error occurred while fetching single choice attributes', async () => {
        // given
        const error = {
            "message": "error",
            "code": 500
        };

        httpMock.onGet(
            `${config.serverUrl}/en/single_choice_attributes.json`
        ).reply(500, error);

        // when
        store.dispatch(actions.fetchSingleChoiceAttributes());
        await flushAllPromises();

        // then
        const expected = [{payload: "Request failed with status code 500", type: actions.ACTIONS.ERROR_OCCURRED}];
        expect(store.getActions()).toEqual(expect.arrayContaining(expected));
    });

    it('should dispatch correct actions when cities are fetched', async () => {
        // given
        const cities = {
            "cities": [
                {
                    "lat": "56°09'N",
                    "lon": "10°13'E",
                    "city": "Aarhus"
                },
                {
                    "lat": "57°09'N",
                    "lon": "2°07'W",
                    "city": "Aberdeen"
                }
            ]
        };

        httpMock.onGet(
            `${config.serverUrl}/en/locations/cities.json`
        ).reply(200, cities);

        // when
        store.dispatch(actions.fetchCities());
        await flushAllPromises();

        // then
        const expected = [{payload: cities, type: actions.ACTIONS.CITIES_FETCHED}];
        expect(store.getActions()).toEqual(expect.arrayContaining(expected));
    });

    it('should dispatch correct actions when error occurred while fetching cities', async () => {
        // given
        const error = {
            "message": "error",
            "code": 500
        };

        httpMock.onGet(
            `${config.serverUrl}/en/locations/cities.json`
        ).reply(500, error);

        // when
        store.dispatch(actions.fetchCities());
        await flushAllPromises();

        // then
        const expected = [{payload: "Request failed with status code 500", type: actions.ACTIONS.ERROR_OCCURRED}];
        expect(store.getActions()).toEqual(expect.arrayContaining(expected));
    });

    it('should dispatch correct actions when user is registered', async () => {
        // given
        const user = {
            realName: "John Smith",
            displayName: "John",
            maritalStatus: "Unmarried"
        };

        httpMock.onPost(
            `${config.serverUrl}/users`
        ).reply(201, user);

        // when
        store.dispatch(actions.registerUser(user));
        await flushAllPromises();

        // then
        const expected = [{payload: user, type: actions.ACTIONS.USER_SAVED}];
        expect(store.getActions()).toEqual(expect.arrayContaining(expected));
    });

    it('should dispatch correct actions when error occurred while registering user', async () => {
        // given
        const user = {
            realName: "John Smith",
            displayName: "John",
            maritalStatus: "Unmarried"
        };
        const error = {
            "message": "error",
            "code": 500
        };

        httpMock.onPost(
            `${config.serverUrl}/users`
        ).reply(500, error);

        // when
        store.dispatch(actions.registerUser(user));
        await flushAllPromises();

        // then
        const expected = [{payload: "Request failed with status code 500", type: actions.ACTIONS.ERROR_OCCURRED}];
        expect(store.getActions()).toEqual(expect.arrayContaining(expected));
    });

    it('should dispatch correct actions when user is fetched', async () => {
        // given
        let userId = "56789tyuiohjknm";
        const user = {
            "id": userId,
            "aboutMe": "Banker in London",
            "dateOfBirth": "2001-01-02",
            "displayName": "John",
            "email": "john.smith@gmail.com",
            "ethnicity": "Native American",
            "figure": "Normal",
            "gender": "Male",
            "height": "170",
            "location": {
                "city": "Aarhus",
                "lat": "56°09'N",
                "lon": "10°13'E"
            },
            "maritalStatus": "Divorced",
            "occupation": "Banker",
            "realName": "John Smith",
            "religion": "Christian",
            "profilePic": "https://kunalhiray7.github.io/gallery/photos/Potraits/DSC_0670.jpg"
        };

        httpMock.onGet(
            `${config.serverUrl}/user/${userId}`
        ).reply(200, user);

        // when
        store.dispatch(actions.fetchUserProfile(userId));
        await flushAllPromises();

        // then
        const expected = [{payload: user, type: actions.ACTIONS.PROFILE_FETCHED}];
        expect(store.getActions()).toEqual(expect.arrayContaining(expected));
    });

    it('should dispatch correct actions when error occurred while fetching single choice attributes', async () => {
        // given
        let userId = "56789tyuiohjknm";
        const error = {
            "message": "error",
            "code": 500
        };

        httpMock.onGet(
            `${config.serverUrl}/user/${userId}`
        ).reply(500, error);

        // when
        store.dispatch(actions.fetchUserProfile(userId));
        await flushAllPromises();

        // then
        const expected = [{payload: "Request failed with status code 500", type: actions.ACTIONS.ERROR_OCCURRED}];
        expect(store.getActions()).toEqual(expect.arrayContaining(expected));
    });

    it('should dispatch correct actions user is authenticated', async () => {
        // given
        const history = {push: jest.fn()};
        const request = {
            username: "john.smith@gmail.com"
        };
        const id = "6789yuibn";
        const profile = {
            id: id,
            realName: "John Smith"
        };

        httpMock.onPut(
            `${config.serverUrl}/authentications`
        ).reply(200, profile);

        // when
        store.dispatch(actions.authenticate(request, history));
        await flushAllPromises();

        // then
        const expected = [{payload: profile, type: actions.ACTIONS.PROFILE_FETCHED}];
        expect(store.getActions()).toEqual(expect.arrayContaining(expected));
        expect(history.push).toHaveBeenCalledWith(`/profile/${id}`)
    });

    it('should dispatch correct actions when error occurred while authenticating user', async () => {
        // given
        const request = {
            username: "john.smith@gmail.com"
        };
        const history = {push: jest.fn()};
        const error = {
            "message": "error",
            "code": 500
        };

        httpMock.onPut(
            `${config.serverUrl}/authentications`
        ).reply(500, error);

        // when
        store.dispatch(actions.authenticate(request, history));
        await flushAllPromises();

        // then
        const expected = [{payload: "Request failed with status code 500", type: actions.ACTIONS.ERROR_OCCURRED}];
        expect(store.getActions()).toEqual(expect.arrayContaining(expected));
        expect(history.push).not.toHaveBeenCalled();
    });
});