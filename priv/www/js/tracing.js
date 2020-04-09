dispatcher_add(function(sammy) {
    sammy.get('#/traces', function() {
            render({'traces': '/traces',
                    'vhosts': '/vhosts',
                    'files': '/trace-files'},
                   'traces', '#/traces');
        });
    sammy.get('#/traces/:vhost/:name', function() {
            var path = '/traces/' + esc(this.params['vhost']) + '/' + esc(this.params['name']);
            render({'trace': path},
                'trace', '#/traces');
        });
    sammy.put('#/traces', function() {
            if (sync_put(this, '/traces/:vhost/:name'))
                update();
            return false;
        });
    sammy.del('#/traces', function() {
            if (sync_delete(this, '/traces/:vhost/:name'))
                partial_update();
            return false;
        });
    sammy.del('#/trace-files', function() {
            if (sync_delete(this, '/trace-files/:name'))
                partial_update();
            return false;
        });
});

$("#tabs").append('<li class="administrator-only"><a href="#/traces">Tracing</a></li>');
