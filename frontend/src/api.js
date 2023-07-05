import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 *
 */

class YodlrApi {
    static token;

    /** Function to create an axios request.
     * 
     * Handles provided endpoint, data, and method.
     * 
     * Automatically passes authorization header with token saved on class.
     * 
     * @returns the axios response data.
     * 
     * If error in API call, throws error and logs error to the console.
     */

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`
        const headers = { Authorization: `Bearer ${YodlrApi.token}` };
        const params = (method === "get") ? data : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // API routes


    /** Register users */
    static async registerUser(userInfo) {
        try{
            let res = await this.request(`users`, userInfo, "post");
            return res;
        } catch (err) {
            console.log('Error in registerUser:', err)
            throw err;
        }
    }

    /** Get all users 
     * 
     * @returns array of json user data
     * @example [{
		            "id": 1,
		            "email": "kyle@getyodlr.com",
		            "firstName": "Kyle",
		            "lastName": "White",
		            "state": "active"
	            }, ...]
    */

    static async getAllUsers() {
        try{
            let res = await this.request(`users`);
            return res;
        } catch (err) {
            console.log('Error in getAllUsers:', err)
            throw err;
        }
    }

    /** Get single user by id
     * 
     * @params user id
     * @returns array of json user data
     * @example {
	                "id": 1,
	                "email": "kyle@getyodlr.com",
	                "firstName": "Kyle",
	                "lastName": "White",
	                "state": "active"
                }
    */

    static async getUserById(user_id) {
        try{
            let res = await this.request(`users/${user_id}`)
            return res;
        } catch (err) {
            console.log('Error in getUserById:', err)
            throw err;
        }
    }

    /** Update users 
     * 
     * @params user update data
     * @returns updated user json
     * 
     * Server throws error if id of user passed in req.body does not match that of the id in user passed in params
    */

    static async updateUser(user) {
        try{
            const res = await this.request(`users/${user.id}`, user, "put");
            return res;
        } catch (err) {
            console.log('Error in updateUser:', err)
            throw err;
        }
    }

    /** Delete users 
     * 
     * @params user id
     * @returns deleted user json
     * 
    */

    static async deleteUser(user_id) {
        try{
            let res = await this.request(`users/${user_id}`, {}, "delete");
            return res;
        } catch (err) {
            console.log('Error in deleteUser:', err)
            throw err;
        }
    }

}

export default YodlrApi;