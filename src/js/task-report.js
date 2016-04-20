$.fn.graphite.defaults.url = "http://graphite.openstack.org/render/";
tasks = [
    'ServerCreate',
    'ServerDelete',
    'ServerList',
    'ServerGet',
    'PortList',
    'NetworkList',
    'SubnetList'
];

float_tasks = [
    'NeutronFloatingIPList',
    'NeutronFloatingIPCreate',
    'NeutronFloatingIPDelete'
]

big_providers = [
    'rax',
    'ovh',
]

small_providers = [
    'bluebox',
    'internap'
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
      yMax: '7',
      title: tasks[i],
      target: [
          "alias(scale(averageSeries(stats.timers.nodepool.task.bluebox-sjc1." + tasks[i] + "Task.mean), '0.001'), 'BB')",
          "alias(scale(averageSeries(stats.timers.nodepool.task.ovh-gra1." + tasks[i] + "Task.mean), '0.001'), 'OVH')",
          "alias(scale(averageSeries(stats.timers.nodepool.task.rax-*." + tasks[i] + "Task.mean), '0.001'), 'RAX')",
          "alias(scale(averageSeries(stats.timers.nodepool.task.internap-*." + tasks[i] + "Task.mean), '0.001'), 'INAP')",
          "alias(scale(averageSeries(stats.timers.nodepool.task.vexx*." + tasks[i] + "Task.mean), '0.001'), 'VEXX')",
          "alias(scale(averageSeries(stats.timers.nodepool.task.osic*." + tasks[i] + "Task.mean), '0.001'), 'OSIC')",
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
      yMax: '3',
      title: float_tasks[i],
      target: [
          "alias(scale(averageSeries(stats.timers.nodepool.task.bluebox-sjc1." + float_tasks[i] + "Task.mean), '0.001'), 'BB')",
          "alias(scale(averageSeries(stats.timers.nodepool.task.osic-cloud1." + float_tasks[i] + "Task.mean), '0.001'), 'OSIC')",
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
      yMax: '100',
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
      yMax: '100',
      title: "Vexxhost nodes launched",
      target: [
         "color(alias(summarize(sumSeries(stats_counts.nodepool.launch.provider.vexx*.ready), '1h'), 'Ready'), '00ff22')",
         "color(alias(summarize(sumSeries(stats_counts.nodepool.launch.provider.vexx*.error.*), '1h'), 'Error'), 'ff0000')"
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
      title: "OSIC nodes launched",
      target: [
         "color(alias(summarize(sumSeries(stats_counts.nodepool.launch.provider.osic*.ready), '1h'), 'Ready'), '00ff22')",
         "color(alias(summarize(sumSeries(stats_counts.nodepool.launch.provider.osic*.error.*), '1h'), 'Error'), 'ff0000')"
      ]
  }));

  $("#graph-container").append($(new Image()).addClass('graph').graphite({
      from: "-72hours",
      width: 885,
      height: 495,
      bgcolor: 'ffffff',
      fgcolor: '000000',
      areaMode: 'stacked',
      yMax: '200',
      title: "Internap nodes launched",
      target: [
         "color(alias(summarize(sumSeries(stats_counts.nodepool.launch.provider.internap*.ready), '1h'), 'Ready'), '00ff22')",
         "color(alias(summarize(sumSeries(stats_counts.nodepool.launch.provider.internap*.error.*), '1h'), 'Error'), 'ff0000')"
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
          "alias(scale(averageSeries(stats.timers.nodepool.job." + jobs[i] + ".master.*.bluebox-sjc1.runtime.mean), '0.000016'), 'BB')",
          "alias(scale(averageSeries(stats.timers.nodepool.job." + jobs[i] + ".master.*.ovh-gra1.runtime.mean), '0.000016'), 'OVH')",
          "alias(scale(averageSeries(stats.timers.nodepool.job." + jobs[i] + ".master.*.rax-*.runtime.mean), '0.000016'), 'RAX')",
          "alias(scale(averageSeries(stats.timers.nodepool.job." + jobs[i] + ".master.*.internap-*.runtime.mean), '0.000016'), 'INAP')",
          "alias(scale(averageSeries(stats.timers.nodepool.job." + jobs[i] + ".master.*.vexx*.runtime.mean), '0.000016'), 'VEXX')",
          "alias(scale(averageSeries(stats.timers.nodepool.job." + jobs[i] + ".master.*.osic*.runtime.mean), '0.000016'), 'OSIC')",
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
        "alias(scale(averageSeries(stats.timers.nodepool.launch.provider.bluebox-sjc1.ready.mean), '0.000016'), 'BB')",
        "alias(scale(averageSeries(stats.timers.nodepool.launch.provider.ovh-gra1.ready.mean), '0.000016'), 'OVH')",
        "alias(scale(averageSeries(stats.timers.nodepool.launch.provider.rax-*.ready.mean), '0.000016'), 'RAX')",
        "alias(scale(averageSeries(stats.timers.nodepool.launch.provider.internap-*.ready.mean), '0.000016'), 'INAP')",
        "alias(scale(averageSeries(stats.timers.nodepool.launch.provider.vexx*.ready.mean), '0.000016'), 'VEXX')",
        "alias(scale(averageSeries(stats.timers.nodepool.launch.provider.osic*.ready.mean), '0.000016'), 'OSIC')",
    ]
}));
