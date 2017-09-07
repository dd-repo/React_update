server "52.37.200.22", user: "deploy", roles: %w{app db web}

set :branch, 'staging'
after 'deploy:symlink:release', 'npm:staging_deploy'
