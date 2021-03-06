//Что-то мне не понравился такой подход. Неочевидный код в компонентах выходит
//TODO: Постепенно убирать его
module.exports = {
    direction: {
        direction: 'Направление',
        responsibleContact: 'Ответственный за направление',
        coord: 'Координатор изменения',
        product: 'Продукт',
    },
    userProfile: {
        name: 'Код в ITSM системе',
        role: 'Тип пользователя'
    },
    groupAffectedItem: {
        direction: 'Направление',
        name: 'Название',
        responsibleContact: 'Ответственный',
        coord: 'Координатор изменения',
        isBlocked: 'Залокировано',
        additionalInfo: 'Доп. информация',
    },
    device: {
        category: 'Категория КЕ',
        type: 'Тип КЕ',
        logicalName: 'Наименование (Код поиска)',
        fullName: 'Наименование (полное)',
        status: 'Статус',
        direction: 'Направление',
        groupAffectedItem: 'Группа услуг',
        product: 'Продукт',
        adminGroup: 'Группа администраторов КЕ',
        ciOwner: 'Владелец КЕ',
        responsibleGroup: 'Ответственная РГ',
        curator: 'Куратор КЕ/МОЛ',
        ownerOrg: 'Собственник (организация)',
        baseTransfer: 'Основание передачи',
        controlLevel: 'Уровень контроля изменений',
        usageStart: 'Дата ввода в эксплуатацию',
        severity: 'Критичность',
        cod: 'ЦОД',
        codID: 'Идентификатор ЦОД',
        infSys: 'ИС',
        serverModel: 'Модель',
        serverFormFactor: 'Form factor',
        serverUnitCount: 'Количество Unit',
        serverPN: 'p/n',
        serverAssetNumber: 'Инвентарный номер',
        serverSerialNumber: 'Серийный номер/machine type',
        serverExternalNumber: 'Внешний номер',
        oiv: 'ОИВ',
        dept: 'Учреждение',
        placement: 'Помещение',
        area: 'Площадка',
    },
    service: {
        service: 'Сервис',
        affectedItem: 'Услуга',
        affectedCIs: 'Основное КЕ',
    },
    contact: {
        lastName: 'Фамилия',
        firstName: 'Имя',
        middleName: 'Отчество',
        product: 'Продукт',
        position: 'Должность',
        manager: 'Руководитель',
        internalPhone: 'Внутренний номер',
        mobilePhone: 'Мобильный номер',
        emailFirst: 'Email 1',
        emailSecond: 'Email 2',
        loginSM: 'Учетная запись SM',
        kcList: 'Список КЦ',
    },
    contactOrg: {
        dept: 'Название Учреждения/Организации',
        deptShort: 'Сокращенное наименование',
        fullStructure: 'Полная структура',
        oiv: 'ОИВ',
    },
    contactLoc: {
        location: 'Площадка',
        region: 'Округ',
        district: 'Район',
    },
    kc: {  
        name: 'Наименование',
        manager: 'Руководитель',
        isBlocked: 'Заблокировано',
        directionList: 'Направления',
    },
    ck: {
        name: 'Наименование',
        coord: 'Координатор ЦК',
        isBlocked: 'Заблокировано',
        assignees: 'Инженеры ЦК',
        directionList: 'Направления ЦК',
    },
};
