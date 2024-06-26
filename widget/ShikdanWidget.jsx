import { React, useState } from 'react';
import { StyleSheet } from 'react-native';
import { FlexWidget, TextWidget, ImageWidget, ListWidget } from 'react-native-android-widget';
import { Meal } from "../entity/Meal";


export function ShikdanWidget({currentDate = '2000-12-31', meals = []}) {

  // 학생과 교직원 필터링
  const studentMenus = meals.filter(meal => meal.type === 'student' || meal.type === 'lunch');
  const employeeMenus = meals.filter(meal => meal.type === 'employee');

  return (
     <FlexWidget style={styles.widgetStyle} clickAction="OPEN_APP">
      <TextWidget text={currentDate} style={styles.dateStyle} />

      <TextWidget text={"학생식당"} style={styles.titleStyle} />
      <ListWidget style={styles.listStyle}>
        {studentMenus.map((meal, index) => (
          <FlexWidget key={index} style={styles.flexWidgetStyle}>
            <TextWidget text={`- ${meal.name}`} style={styles.itemStyle} />
            <FlexWidget style={styles.flexwidget}>
              <ImageWidget 
                image={require('../assets/icons/heart.png')} 
                imageWidth={15} 
                imageHeight={15} 
                marginHorizontal={8} 
              />
              <TextWidget text={`${meal.likeCount}`} style={styles.likeTextStyle} />
            </FlexWidget>
          </FlexWidget>
        ))}
      </ListWidget>

      {employeeMenus.length > 0 && (
        <FlexWidget style={{width:'match_parent'}}>
          <TextWidget text={"교직원식당"} style={styles.titleStyle} />
          <ListWidget style={styles.listStyle}>
            {employeeMenus.map((meal, index) => (
              <FlexWidget key={index} style={styles.flexWidgetStyle}>
               <TextWidget text={` ${meal.name.split(',').slice(0, 3).join(', ')}`} style={styles.employeeitemStyle} />
              </FlexWidget>
            ))}
          </ListWidget>
        </FlexWidget>
      )}
    </FlexWidget>
  );
}

const styles = StyleSheet.create({
  widgetStyle: {
    padding: 16,
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    height: 'match_parent',
    width: 'match_parent',
    backgroundColor: '#ffffff',
    borderColor: "#808080",
  },
  dateStyle: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
  },
  titleStyle: {
    fontSize: 18,
    color: '#777',
  },
  itemStyle: {
    fontSize: 18,
    color: '#333333',
    flex:1,
    fontWeight: 'bold',
  },
  employeeitemStyle: {
    fontSize: 17,
    color: '#333333',
    flex:1,
    fontWeight: 'bold',
  },
  listStyle: {
    height: 80,
    width: 'match_parent',
  },
  flexWidgetStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexGrow: 0,
    width: 'match_parent',
    marginTop: 4,
    marginHorizontal: 6,
  },
  flexwidget:{
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    flexBasis: 0,
  },
  likeTextStyle: {
    width: 30,
    textAlign: 'right',
    fontSize: 20,
    color: '#333',
  },
  heartStyle: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
});

