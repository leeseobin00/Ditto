package com.ssafy.ditto.global.config;

import com.ssafy.ditto.global.tasklet.ManageLiveRoomsTasklet;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.batch.core.launch.support.RunIdIncrementer;

@Configuration
@RequiredArgsConstructor
@EnableBatchProcessing
public class BatchConfig {
    private final JobRepository jobRepository;
    private final PlatformTransactionManager transactionManager;
    private final ManageLiveRoomsTasklet manageLiveRoomsTasklet;

    @Bean
    public Job job() {
        return new JobBuilder("job", jobRepository)
                .incrementer(new RunIdIncrementer())
                .start(manageLiveRoomsStep())
//                .next(anotherStep())
                .build();
    }

    @Bean
    public Step manageLiveRoomsStep() {
        return new StepBuilder("manageLiveRoomsStep", jobRepository)
                .tasklet(manageLiveRoomsTasklet, transactionManager)
                .build();
    }
}