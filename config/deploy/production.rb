server "54.201.73.115", user: "ubuntu", roles: %w{app db web}

set :branch, 'development'
set :deploy_to, '/home/ubuntu'
after 'deploy:symlink:release', 'npm:production_deploy'
