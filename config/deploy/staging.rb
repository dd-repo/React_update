server "52.37.200.22", user: "deploy", roles: %w{app db web}

set :deploy_to, '/home/deploy'
set :tmp_dir, "/home/deploy/tmp"
set :branch, 'development'
after 'deploy:symlink:release', 'npm:staging_deploy'
