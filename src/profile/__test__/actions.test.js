import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import {config, http} from '../../api/http';
import * as actions from '../actions';

describe("Profile Actions", () => {
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
});