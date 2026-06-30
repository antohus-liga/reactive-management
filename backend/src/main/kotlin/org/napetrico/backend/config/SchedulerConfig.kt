package org.napetrico.backend.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.scheduling.TaskScheduler
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler

@Configuration
class SchedulerConfig {

    @Bean
    fun productionTaskScheduler(): TaskScheduler = ThreadPoolTaskScheduler().apply {
        poolSize = 4
        initialize()
    }
}