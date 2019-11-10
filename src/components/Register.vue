<template>
  <div class="container py-3">
    <div class="card">
      <div class="card-header">Register</div>
      <div class="card-body">
        <ValidationObserver ref="regObserver" v-slot="{ invalid }">
          <form @submit.prevent="registerSubmit">
            <div class="form-group">
              <label for="username">Username</label>
              <ValidationProvider
                name="Username"
                rules="required|min:3|alpha_dash|username_unique"
                v-slot="{ errors }"
                :bails="false"
              >
                <input
                  v-model.trim="fileds.username"
                  type="text"
                  class="form-control"
                  id="username"
                  placeholder
                />
                <ValidationError :errors="errors"></ValidationError>
              </ValidationProvider>
            </div>

            <div class="form-group">
              <label for="email">Email address</label>
              <ValidationProvider name="Email" rules="required|email|email_unique" v-slot="{ errors }">
                <input
                  v-model="fileds.email"
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="name@example.com"
                />
                <ValidationError :errors="errors"></ValidationError>
              </ValidationProvider>
            </div>

            <div class="form-group">
              <label for="password">Password</label>
              <ValidationProvider name="Password" rules="required|min:3" v-slot="{ errors }">
                <input
                  v-model="fileds.password"
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder
                />
                <ValidationError :errors="errors"></ValidationError>
              </ValidationProvider>
            </div>

            <div class="form-group">
              <label for="repassword">Retype Password</label>
              <ValidationProvider
                name="Retype password"
                rules="required|confirmed:Password"
                v-slot="{ errors }"
              >
                <input
                  v-model="fileds.password_confirmation"
                  type="password"
                  class="form-control"
                  id="repassword"
                  placeholder
                />
                <ValidationError :errors="errors"></ValidationError>
              </ValidationProvider>
            </div>

            <div class="form-group">
              <label for="name">Name</label>
              <ValidationProvider name="Name" rules="required" v-slot="{ errors }">
                <input v-model="fileds.name" type="text" class="form-control" id="name" placeholder />
                <ValidationError :errors="errors"></ValidationError>
              </ValidationProvider>
            </div>

            <button class="btn btn-primary" type="submit">Register</button>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import {
  email,
  required,
  confirmed,
  min,
  alpha_dash
} from "vee-validate/dist/rules";
import ValidationError from "./ValidationError";
import validatorExtends from "../services/validatorExtends";

extend("email", {
  ...email,
  message: (f, o) => `${o._value_} is not a valid email`
});
extend("min", {
  ...min,
  message: (f, o) => `${f} has to be minimum ${o.length} characters`
});
extend("alpha_dash", {
  ...alpha_dash,
  message: (f, o) => `Characters A-z 0-9 - and _ are supported`
});
extend("required", {
  ...required,
  message: f => f + " field is required"
});
extend("confirmed", {
  ...confirmed,
  message: (f, o) => `Doesn't match ${o._target_}`
});

extend("username_unique", {
  validate: async val => {
    if (val.length < 3) return true;

    const res = await validatorExtends.checkUniqueUsername(val);
    console.log(res.data);

    if (res.data.valid) return true;

    return {
      valid: false,
      data: {
        serverMessage: res.data.message
      }
    };
  },
  message: `{serverMessage}`
});

extend("email_unique", {
  validate: async val => {
    if (val.length < 3) return true;

    const res = await validatorExtends.checkUniqueEmail(val);
    console.log(res.data);

    if (res.data.valid) return true;

    return {
      valid: false,
      data: {
        serverMessage: res.data.message
      }
    };
  },
  message: `{serverMessage}`
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    ValidationError
  },
  data() {
    return {
      fileds: {
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
        name: ""
      }
    };
  },
  methods: {
    ...mapActions(['registerUser']),
    async registerSubmit() {
        const valid = await this.$refs.regObserver.validate();
        //if(!valid) return;

        this.registerUser(this.fileds)
    }
  }
};
</script>