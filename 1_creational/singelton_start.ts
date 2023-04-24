// classic singleton
class Singleton {
  private static instance: Singleton;

  private constructor() {}

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }

    return Singleton.instance;
  }
}

namespace Singleton {
  // full control
  class User {
    private constructor() {}

    public static createUser(): User {
      return new User();
    }
  }

  // high control in instance
  User.createUser();
}
