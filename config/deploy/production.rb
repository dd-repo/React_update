server "52.41.99.157", user: "ubuntu", roles: %w{app db web}

set :branch, 'master'
set :deploy_to, '/home/ubuntu'
after 'deploy:symlink:release', 'npm:production_deploy'
