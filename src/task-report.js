$.fn.graphite.defaults.url = "http://graphite.openstack.org/render/";
tasks = [
    'CreateServer',
    'DeleteServer',
    'ListServers'
];

float_tasks = [
    'AddFloatingIP',
    'CreateFloatingIP',
    'DeleteFloatingIP',
    'GetFloatingIP',
    'ListFloatingIPs'
]

providers = [
    'bluebox',
    'hpcloud',
    'rax',
    'tripleo',
    'ovh'
]

jobs = [
    'gate-tempest-dsvm-full',
    'gate-tempest-dsvm-neutron-full'
]

for(i=0; i<tasks.length; ++i) {

  $("#graph-container").append($(new Image()).addClass('graph').graphite({
      from: "-72hours",
      width: 885,
      height: 495,
      bgcolor: 'ffffff',
      fgcolor: '000000',
      lineMode: 'connected',
      title: tasks[i],
      target: [
          "alias(averageSeries(stats.timers.nodepool.task.hpcloud-b*." + tasks[i] + "Task.mean), 'HP')",
          "alias(averageSeries(stats.timers.nodepool.task.ovh-gra1." + tasks[i] + "Task.mean), 'OVH')",
          "alias(averageSeries(stats.timers.nodepool.task.bluebox-sjc1." + tasks[i] + "Task.mean), 'BB')",
          "alias(averageSeries(stats.timers.nodepool.task.rax-dfw." + tasks[i] + "Task.mean), 'DFW')",
          "alias(averageSeries(stats.timers.nodepool.task.rax-iad." + tasks[i] + "Task.mean), 'IAD')",
          "alias(averageSeries(stats.timers.nodepool.task.rax-ord." + tasks[i] + "Task.mean), 'ORD')",
          "alias(averageSeries(stats.timers.nodepool.task.tripleo-test-cloud-rh1." + tasks[i] + "Task.mean), 'TripleO')"
      ]
  }));

}

for(i=0; i<float_tasks.length; ++i) {

  $("#graph-container").append($(new Image()).addClass('graph').graphite({
      from: "-72hours",
      width: 885,
      height: 495,
      bgcolor: 'ffffff',
      fgcolor: '000000',
      lineMode: 'connected',
      title: float_tasks[i],
      target: [
          "alias(averageSeries(stats.timers.nodepool.task.hpcloud-b*." + float_tasks[i] + "Task.mean), 'HP')",
          "alias(averageSeries(stats.timers.nodepool.task.bluebox-sjc1." + float_tasks[i] + "Task.mean), 'BB')",
          "alias(averageSeries(stats.timers.nodepool.task.tripleo-test-cloud-rh1*." + float_tasks[i] + "Task.mean), 'TripleO')"
      ]
  }));

}

  $("#graph-container").append($(new Image()).addClass('graph').graphite({
      from: "-72hours",
      width: 885,
      height: 495,
      bgcolor: 'ffffff',
      fgcolor: '000000',
      lineMode: 'connected',
      title: 'Time to SSH Ready',
      target: [
          "alias(averageSeries(stats.timers.nodepool.launch.provider.hpcloud-b*.ready.mean), 'HP')",
          "alias(averageSeries(stats.timers.nodepool.launch.provider.ovh-gra1.ready.mean), 'OVH')",
          "alias(averageSeries(stats.timers.nodepool.launch.provider.bluebox-sjc1.ready.mean), 'BB')",
          "alias(averageSeries(stats.timers.nodepool.launch.provider.rax-dfw.ready.mean), 'RAX DFW')",
          "alias(averageSeries(stats.timers.nodepool.launch.provider.rax-iad.ready.mean), 'RAX IAD')",
          "alias(averageSeries(stats.timers.nodepool.launch.provider.rax-ord.ready.mean), 'RAX ORD')",
          "alias(averageSeries(stats.timers.nodepool.launch.provider.tripleo-test-cloud-rh1.ready.mean), 'TripleO')"
      ]
  }));


for(i=0; i<providers.length; ++i) {
  $("#graph-container").append($(new Image()).addClass('graph').graphite({
      from: "-72hours",
      width: 885,
      height: 495,
      bgcolor: 'ffffff',
      fgcolor: '000000',
      areaMode: 'stacked',
      title: providers[i] + " nodes launched",
      target: [
         "color(alias(summarize(sumSeries(stats_counts.nodepool.launch.provider." + providers[i] + "*.ready), '1h'), 'Ready'), '00ff22')",
         "color(alias(summarize(sumSeries(stats_counts.nodepool.launch.provider." + providers[i] + "*.error.*), '1h'), 'Error'), 'ff0000')"
      ]
  }));

}

for(i=0; i<jobs.length; ++i) {
  $("#graph-container").append($(new Image()).addClass('graph').graphite({
      from: "-72hours",
      width: 885,
      height: 495,
      bgcolor: 'ffffff',
      fgcolor: '000000',
      lineMode: 'connected',
      title: jobs[i] + ' job runtime',
      target: [
          "alias(averageSeries(stats.timers.nodepool.job." + jobs[i] + ".master.*.hpcloud-b*.runtime.mean), 'HP')",
          "alias(averageSeries(stats.timers.nodepool.job." + jobs[i] + ".master.*.ovh-gra1.runtime.mean), 'OVH')",
          "alias(averageSeries(stats.timers.nodepool.job." + jobs[i] + ".master.*.rax-dfw.runtime.mean), 'RAX DFW')",
          "alias(averageSeries(stats.timers.nodepool.job." + jobs[i] + ".master.*.rax-iad.runtime.mean), 'RAX IAD')",
          "alias(averageSeries(stats.timers.nodepool.job." + jobs[i] + ".master.*.rax-ord.runtime.mean), 'RAX ORD')"
      ]
  }));
}
