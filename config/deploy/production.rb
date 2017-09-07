server "52.41.99.157", user: "ubuntu", roles: %w{app db web}
set :branch, 'development'
after 'deploy:symlink:release', 'npm:production_deploy'
