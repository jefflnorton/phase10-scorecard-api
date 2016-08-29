module.exports = function(app) {
  var User = app.models.User;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;

  User.findOrCreate({
    where: { username: 'admin' }
  },
  {
    username: 'admin',
    email: 'jefflnorton@gmail.com',
    password: 'password'
  }, function(err, user) {
    if (err) throw err;

    console.log('Created admin user:', user);

    Role.findOrCreate({
        where: { name: 'admin' }
    },
    {
      name: 'admin'
    }, function(err, role) {
      if (err) throw err;

      console.log('Created admin role:', role);

      role.principals({
        where: { and: [{ principalType: RoleMapping.USER }, { principalId: user.id }] }
      }, function(err, principals) {
        if (err) throw err;

        if (principals.length == 0) {
          role.principals.create({
            principalType: RoleMapping.USER,
            principalId: user.id
          }, function(err, principal) {
            if (err) throw err;

            console.log('Created admin principal:', principal);
          });
        } else {
          console.log('Found admin principal:', principals);
        }
      });
    });
  });

  User.findOrCreate({
    where: { username: 'user1' }
  },
  {
    username: 'user1',
    email: 'user1@gmail.com',
    password: 'password'
  }, function(err, user) {
    if (err) throw err;

    console.log('Created user1 user:', user);
  });
};
