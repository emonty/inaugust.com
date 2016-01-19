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

big_providers = [
    'hpcloud',
    'rax',
]

small_providers = [
    'bluebox',
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
      vtitle: 'Time in Seconds',
      yMax: '10',
      title: tasks[i],
      target: [
          "alias(scale(averageSeries(stats.timers.nodepool.task.hpcloud-b*." + tasks[i] + "Task.mean), '0.001'), 'HP')",
          "alias(scale(averageSeries(stats.timers.nodepool.task.bluebox-sjc1." + tasks[i] + "Task.mean), '0.001'), 'BB')",
          "alias(scale(averageSeries(stats.timers.nodepool.task.ovh-gra1." + tasks[i] + "Task.mean), '0.001'), 'OVH')",
          "alias(scale(averageSeries(stats.timers.nodepool.task.rax-*." + tasks[i] + "Task.mean), '0.001'), 'RAX')",
          "alias(scale(averageSeries(stats.timers.nodepool.task.internap-*." + tasks[i] + "Task.mean), '0.001'), 'INAP')",
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
      vtitle: 'Time in Seconds',
      yMax: '10',
      title: float_tasks[i],
      target: [
          "alias(scale(averageSeries(stats.timers.nodepool.task.hpcloud-b*." + float_tasks[i] + "Task.mean), '0.001'), 'HP')",
          "alias(scale(averageSeries(stats.timers.nodepool.task.bluebox-sjc1." + float_tasks[i] + "Task.mean), '0.001'), 'BB')",
      ]
  }));

}

for(i=0; i<big_providers.length; ++i) {
  $("#graph-container").append($(new Image()).addClass('graph').graphite({
      from: "-72hours",
      width: 885,
      height: 495,
      bgcolor: 'ffffff',
      fgcolor: '000000',
      areaMode: 'stacked',
      yMax: '800',
      title: big_providers[i] + " nodes launched",
      target: [
         "color(alias(summarize(sumSeries(stats_counts.nodepool.launch.provider." + big_providers[i] + "*.ready), '1h'), 'Ready'), '00ff22')",
         "color(alias(summarize(sumSeries(stats_counts.nodepool.launch.provider." + big_providers[i] + "*.error.*), '1h'), 'Error'), 'ff0000')"
      ]
  }));

}

  $("#graph-container").append($(new Image()).addClass('graph').graphite({
      from: "-72hours",
      width: 885,
      height: 495,
      bgcolor: 'ffffff',
      fgcolor: '000000',
      areaMode: 'stacked',
      yMax: '80',
      title: "Blue Box nodes launched",
      target: [
         "color(alias(summarize(sumSeries(stats_counts.nodepool.launch.provider.bluebox*.ready), '1h'), 'Ready'), '00ff22')",
         "color(alias(summarize(sumSeries(stats_counts.nodepool.launch.provider.bluebox*.error.*), '1h'), 'Error'), 'ff0000')"
      ]
  }));

  $("#graph-container").append($(new Image()).addClass('graph').graphite({
      from: "-72hours",
      width: 885,
      height: 495,
      bgcolor: 'ffffff',
      fgcolor: '000000',
      areaMode: 'stacked',
      yMax: '80',
      title: "Internap nodes launched",
      target: [
         "color(alias(summarize(sumSeries(stats_counts.nodepool.launch.provider.internap*.ready), '1h'), 'Ready'), '00ff22')",
         "color(alias(summarize(sumSeries(stats_counts.nodepool.launch.provider.internap*.error.*), '1h'), 'Error'), 'ff0000')"
      ]
  }));

  $("#graph-container").append($(new Image()).addClass('graph').graphite({
      from: "-72hours",
      width: 885,
      height: 495,
      bgcolor: 'ffffff',
      fgcolor: '000000',
      areaMode: 'stacked',
      yMax: '400',
      title: "OVH nodes launched",
      target: [
         "color(alias(summarize(sumSeries(stats_counts.nodepool.launch.provider.ovh*.ready), '1h'), 'Ready'), '00ff22')",
         "color(alias(summarize(sumSeries(stats_counts.nodepool.launch.provider.ovh*.error.*), '1h'), 'Error'), 'ff0000')"
      ]
  }));

for(i=0; i<jobs.length; ++i) {
  $("#graph-container").append($(new Image()).addClass('graph').graphite({
      from: "-72hours",
      width: 885,
      height: 495,
      bgcolor: 'ffffff',
      fgcolor: '000000',
      lineMode: 'connected',
      vtitle: 'Time in Minute',
      yMax: '90',
      title: jobs[i] + ' job runtime',
      target: [
          "alias(scale(averageSeries(stats.timers.nodepool.job." + jobs[i] + ".master.*.hpcloud-b*.runtime.mean), '0.000016'), 'HP')",
          "alias(scale(averageSeries(stats.timers.nodepool.job." + jobs[i] + ".master.*.bluebox-sjc1.runtime.mean), '0.000016'), 'BB')",
          "alias(scale(averageSeries(stats.timers.nodepool.job." + jobs[i] + ".master.*.ovh-gra1.runtime.mean), '0.000016'), 'OVH')",
          "alias(scale(averageSeries(stats.timers.nodepool.job." + jobs[i] + ".master.*.rax-*.runtime.mean), '0.000016'), 'RAX')",
          "alias(scale(averageSeries(stats.timers.nodepool.job." + jobs[i] + ".master.*.internap-*.runtime.mean), '0.000016'), 'INAP')",
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
    vtitle: 'Time in Minutes',
    title: 'Time to SSH Ready',
    target: [
        "alias(scale(averageSeries(stats.timers.nodepool.launch.provider.hpcloud-b*.ready.mean), '0.000016'), 'HP')",
        "alias(scale(averageSeries(stats.timers.nodepool.launch.provider.bluebox-sjc1.ready.mean), '0.000016'), 'BB')",
        "alias(scale(averageSeries(stats.timers.nodepool.launch.provider.ovh-gra1.ready.mean), '0.000016'), 'OVH')",
        "alias(scale(averageSeries(stats.timers.nodepool.launch.provider.rax-*.ready.mean), '0.000016'), 'RAX')",
        "alias(scale(averageSeries(stats.timers.nodepool.launch.provider.internap-*.ready.mean), '0.000016'), 'INAP')",
    ]
}));
