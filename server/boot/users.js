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

      role.principals.find({
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
};
