# Generated by Django 4.2.11 on 2024-03-31 02:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("words", "0005_alter_word_part_of_speech"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="word",
            name="parts_of_speech",
        ),
    ]
