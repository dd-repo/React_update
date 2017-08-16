# config valid only for current version of Capistrano
#lock "3.8.1"

set :application, "blitz-frontend"
set :repo_url, "https://4e4238c3605170b4d8ed7b4205c698b085019401@github.com/marca-development/blitz-monitoring-frontend.git"

set :branch, 'staging'

set :deploy_to, '/home/deploy'
set :tmp_dir, "/home/deploy/tmp"


set :keep_releases, 5

after 'deploy:symlink:release', 'npm:deploy'
