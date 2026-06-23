package org.napetrico.backend.features.clients

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import org.napetrico.backend.common.enums.CompanyType
import org.napetrico.backend.common.values.Email
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.LocalTime

@Entity
@Table(name = "clients")
class Client (

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0,

    var companyName: String = "",

    var companyType: CompanyType,

    var taxId: String = "",

    var phoneNumber: String = "",

    var email: Email,

    var country: String = "",

    var address: String = "",

    var createdAt: LocalDateTime,

    var updatedAt: LocalDateTime
)