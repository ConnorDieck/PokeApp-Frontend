import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class PokeappApi {
	// the token for interaction with the API will be stored here.
	static token;

	static async request(endpoint, data = {}, method = "get") {
		console.debug("API Call:", endpoint, data, method);

		//there are multiple ways to pass an authorization token, passing it here in the header
		const url = `${BASE_URL}/${endpoint}`;
		const headers = { Authorization: `Bearer ${PokeappApi.token}` };
		const params = method === "get" ? data : {};

		try {
			return (await axios({ url, method, data, params, headers })).data;
		} catch (err) {
			console.error("API Error:", err.response);
			let message = err.response.data.error.message;
			throw Array.isArray(message) ? message : [ message ];
		}
	}

	// Individual API routes

	/** Species */

	/** Get details on a species by applying a filter. */

	static async getSpecies(filter) {
		let res = await this.request(`species`, filter);
		return res.species;
	}

	/** Cards */

	/** Get details on available cards. */

	static async getCards() {
		let res = await this.request(`cards`);
		return res.cards;
	}

	/** Get details on a card by id. */

	static async getCard(id) {
		let res = await this.request(`cards/${id}`);
		return res;
	}

	/** Add new card to db. */

	static async addCard(cardData) {
		let res = await this.request(`cards/`, cardData, "post");
		return res;
	}

	/** Edit a card in db. */

	static async editCard(cardData, id) {
		let res = await this.request(`cards/${id}`, cardData, "patch");
		return res;
	}

	/** Delete a card in db. */

	static async deleteCard(id) {
		let res = await this.request(`cards/${id}`, "delete");
		return res;
	}

	/** Teams */

	/** Get details on available teams. */

	static async getTeams() {
		let res = await this.request(`teams`);
		return res.teams;
	}

	/** Get details on a team by id. */

	static async getTeam(id) {
		let res = await this.request(`teams/${id}`);
		return res;
	}

	/** Add new team to db. */

	static async addTeam(teamData) {
		let res = await this.request(`teams/`, teamData, "post");
		return res;
	}

	/** Edit a team in db. */

	static async editTeam(teamData, id) {
		let res = await this.request(`teams/${id}`, teamData, "patch");
		return res;
	}

	/** Delete a team in db. */

	static async deleteTeam(id) {
		let res = await this.request(`teams/${id}`, "delete");
		return res;
	}

	/** Add a card to team in db. */

	static async addCardToTeam(teamId, cardId) {
		let res = await this.request(`teams/${teamId}/${cardId}`, "post");
		return res;
	}

	/** Remove a card from team in db. */

	static async removeCardFromTeam(teamId, cardId) {
		let res = await this.request(`teams/${teamId}/${cardId}`, "delete");
		return res;
	}

	/** Register a new user and return received JWT token */
	static async register(userData) {
		let res = await this.request(`auth/register`, userData, "post");
		return res.token;
	}

	// Signs a user in with username and password
	static async login(userData) {
		let res = await this.request(`auth/token`, userData, "post");
		return res.token;
	}

	// Gets current user
	static async getCurrentUser(username) {
		let res = await this.request(`users/${username}`);
		return res.user;
	}

	// Edits current user's favorite Pokemon
	static async editFavorite(username, updateData) {
		let res = await this.request(`users/${username}`, updateData, "patch");
		return res;
	}
}

// for now, put token ("testuser" / "password" on class)
PokeappApi.token =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
	"SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
	"FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default PokeappApi;
