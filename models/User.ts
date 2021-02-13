import {Model} from "@vuex-orm/core";

export default class User extends Model {
    static entity = 'users';
    static primaryKey = 'id';

    static fields() {
        return {
            id: this.uid(),
            username: this.string('')
        }
    }
}
