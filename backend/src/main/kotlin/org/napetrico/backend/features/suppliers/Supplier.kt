package org.napetrico.backend.features.suppliers

import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.FetchType
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import jakarta.persistence.Table
import org.hibernate.annotations.JdbcTypeCode
import org.hibernate.type.SqlTypes
import org.napetrico.backend.common.enums.CompanyType
import org.napetrico.backend.common.values.Email
import org.napetrico.backend.features.users.User
import java.time.LocalDateTime

@Entity
@Table(name = "suppliers")
class Supplier (

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    var user: User,

    var companyName: String = "",

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    var companyType: CompanyType,

    var taxId: String = "",

    var phoneNumber: String = "",

    var email: Email,

    var country: String = "",

    var address: String = "",

    var createdAt: LocalDateTime,

    var updatedAt: LocalDateTime
)