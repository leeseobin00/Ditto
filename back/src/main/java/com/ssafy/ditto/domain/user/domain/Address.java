package com.ssafy.ditto.domain.user.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Address")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "address_id")
    private int addressId;

    @Column(name = "zip_code")
    private String zipCode;

    @Column(name = "address1")
    private String address1;

    @Column(name = "address2")
    private String address2;

    @Column(name = "address_name")
    private String addressName;

    @Column(name = "receiver")
    private String receiver;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "is_default")
    private boolean isDefault;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User userId;
}
