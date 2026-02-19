from django.contrib import admin
from .models import EmployeeModel


@admin.register(EmployeeModel)
class EmployeeModelAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'age', "job", "language", "pay")
    search_fields = ('id', 'name')

