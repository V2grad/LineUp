#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Oct 11 16:33:44 2019

@author: apple
"""

from mongoengine import * 
#connect('project1',  host='127.0.0.1', port=27017, username='root', password='example', authentication_source='admin')


class Events(Document):
    eventName = StringField(max_length=50)
    time = intField()
    mentors = ListField(ReferenceField(Mentors))
    tas = ListField(ReferenceField(Ta))
    students = ListField(ReferenceField(Student))
    meta = {'allow_inheritance': True}
    
    
class Assistant(Document):
    

class Student(Document):
    uuid = StringField(max_length=50)
    first_name = StringField(max_length=50)
    last_name = StringField(max_length=50)
    
    

