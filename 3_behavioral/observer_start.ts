// TODO: When a user logged-in, display a toast message, fetch permissions and redirect to dashboard
// TODO: When a user logged-out, display a toast message, redirect to login page

// TODO BONUS: When a user logged-in, display the user name in a navbar component (non exist yet)
// TODO BONUS: When a user logged-in, display the user name in a navbar component (non exist yet)

interface Subscriber<T> {
  update(state: T): void;
}

class Store<T> {
  private subscribers: Set<Subscriber<T>>;
  private state: T;
  private reducer: any;

  constructor(reducer: any) {
    this.subscribers = new Set();
    this.reducer = reducer;
  }

  subscribe(subscriber: Subscriber<T>): Function {
    this.subscribers.add(subscriber);
    subscriber.update(this.state);
    return () => this.subscribers.delete(subscriber);
  }

  dispatch(action: T) {
    this.state = this.reducer(action, this.state);
    this.subscribers.forEach((subscriber) => subscriber.update(this.state));
  }
}

// Implementation

interface User {
  name: string;
}

/**
 * Responsible for auth logic
 */
class AppGlobalState extends Store<User> {
  private _currentUser: any;

  constructor() {
    super();
    this._currentUser = null;
  }

  get currentUser(): any {
    return this._currentUser;
  }

  signIn() {
    this._currentUser = { name: 'Nir' };
    this.dispatch();
  }

  signOut() {
    this._currentUser = null;
    this.dispatch();
  }
}

/**
 *  UI for displaying a message on the screen
 */
class ToastMessage implements Subscriber<User> {
  update(user: User): void {
    this.showToast(`Hello ${user.name}`);
  }

  showToast(message: string) {
    console.log('Display toast message: ' + message);
  }
}

/**
 * Responsible for fetching a set of permissions for
 * A specific User
 */
class PermissionManager {
  getPermissionsForUser(user: any) {
    console.log('Fetching permissions for: ' + user);
  }
}

/**
 * Responsible for routing and redirects
 */
class Router {
  redirectTo(routeName: string) {
    console.log('Redirectong to' + routeName);
  }
}

// runtime

const auth = new AppGlobalState();
auth.signIn();
